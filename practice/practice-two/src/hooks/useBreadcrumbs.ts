import {
  routeConfig,
  type RouteConfig,
} from '@config/route/BreadcrumbRouteConfig'
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

/**
 * useBreadcrumbs - A custom hook for generating breadcrumb navigation based on current route
 *
 * This hook generates breadcrumb navigation items by analyzing the current route path
 * and matching it against the application's route configuration. It supports:
 * - Dynamic route parameter extraction
 * - Nested routes
 * - Custom breadcrumb labels based on route parameters
 * - Custom breadcrumb URLs
 * - Optional custom breadcrumb items override
 *
 * The breadcrumbs always start with a Home item and build the path hierarchy
 * based on the route configuration and current URL.
 *
 * @param {BreadcrumbItem[]} [customItems] - Optional custom breadcrumb items to override
 *                                           automatic generation
 *
 * @returns {BreadcrumbItem[]} An array of breadcrumb items with labels and paths
 *
 */
export interface BreadcrumbItem {
  label: string
  path: string
}

/**
 * Find the route configuration that matches the current URL pathname
 *
 * This function converts route patterns with parameters (like "/:category/:id")
 * into regular expressions and finds the most specific matching route.
 * Routes are sorted by path length to ensure more specific routes are checked first.
 *
 * @param {string} pathname - The current URL pathname
 * @returns {RouteConfig|null} The matching route config or null if no match
 */
const findMatchingRoute = (pathname: string) => {
  // Sort routes by specificity (longest path first)
  const routes = Object.values(routeConfig).sort(
    (a, b) => b.path.length - a.path.length
  )

  // Find the first matching route
  for (const route of routes) {
    // Convert route patterns like '/:category/:id' to regex
    const pattern = route.path
      .replace(/:[^\s/]+/g, '([^/]+)')
      .replace(/\//g, '\\/')
    const regex = new RegExp(`^${pattern}$`)

    if (regex.test(pathname)) {
      return route
    }
  }

  return null
}

/**
 * Extract dynamic parameters from a URL path based on a route pattern
 *
 * This function compares a route path pattern (e.g., "/category/:categoryId/product/:productId")
 * with an actual pathname (e.g., "/category/electronics/product/12345") and extracts
 * the parameter values into a key-value object (e.g., {categoryId: "electronics", productId: "12345"}).
 *
 * @param {string} routePath - The route path pattern with parameter placeholders
 * @param {string} pathname - The actual URL pathname to extract parameters from
 * @returns {Record<string, string>} Object containing the extracted parameter values
 */
const extractParams = (routePath: string, pathname: string) => {
  const params: Record<string, string> = {}
  const routeParts = routePath.split('/')
  const pathParts = pathname.split('/')

  routeParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1)
      params[paramName] = pathParts[index]
    }
  })

  return params
}

/**
 * Generate breadcrumb navigation items based on current route
 *
 * @param {BreadcrumbItem[]} [customItems] - Optional custom breadcrumb items
 * @returns {BreadcrumbItem[]} Array of breadcrumb items with labels and paths
 */
export const useBreadcrumbs = (customItems?: BreadcrumbItem[]) => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    // If custom breadcrumbs are provided, use them instead of generating
    if (customItems) {
      return customItems
    }

    // Generate breadcrumbs based on current route
    const breadcrumbs: BreadcrumbItem[] = []
    const { pathname } = location
    const queryParams: Record<string, string> = {}

    // Convert URL search parameters to a plain object
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })

    // Always add Home as the first breadcrumb
    breadcrumbs.push({
      label: routeConfig.home.label,
      path: routeConfig.home.path,
    })

    // Find the route configuration that matches current pathname
    const route = findMatchingRoute(pathname)

    if (route) {
      // For simple routes without parent routes
      if (!route.parent) {
        if (route.path !== '/') {
          // Don't add home twice
          const routeParams = extractParams(route.path, pathname)

          breadcrumbs.push({
            // Use custom label generator if provided, otherwise use static label
            label: route.getLabel
              ? route.getLabel({ ...routeParams, ...queryParams })
              : route.label,
            // Use custom URL generator if provided, otherwise use current pathname
            path: route.getBreadcrumbUrl
              ? route.getBreadcrumbUrl(routeParams, queryParams)
              : pathname,
          })
        }
      }
      // For nested routes, build complete hierarchy
      else {
        let currentRoute: RouteConfig | null = route
        const routeChain: RouteConfig[] = []

        // Build chain from current route back to parent routes
        while (currentRoute) {
          routeChain.unshift(currentRoute)
          currentRoute = currentRoute.parent
            ? routeConfig[currentRoute.parent]
            : null

          // Avoid duplicates - don't add Home route again
          if (currentRoute && currentRoute.path === '/') {
            currentRoute = null
          }
        }

        // Create breadcrumb for each route in the hierarchy chain
        routeChain.forEach((chainRoute) => {
          // Skip routes marked as not visible in breadcrumbs
          if (chainRoute.breadcrumbVisible !== false) {
            const routeParams = extractParams(chainRoute.path, pathname)

            breadcrumbs.push({
              // Use custom label generator if provided, otherwise use static label
              label: chainRoute.getLabel
                ? chainRoute.getLabel({ ...routeParams, ...queryParams })
                : chainRoute.label,
              // Use custom URL generator if provided, otherwise use current pathname
              path: chainRoute.getBreadcrumbUrl
                ? chainRoute.getBreadcrumbUrl(routeParams, queryParams)
                : pathname,
            })
          }
        })
      }
    }

    return breadcrumbs
  }, [location, searchParams, customItems])
}
