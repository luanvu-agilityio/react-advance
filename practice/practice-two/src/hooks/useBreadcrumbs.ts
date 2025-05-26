import { routeConfig, type RouteConfig } from '../config/BreadcrumbRouteConfig'
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  path: string
}

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

export const useBreadcrumbs = (customItems?: BreadcrumbItem[]) => {
  const location = useLocation()

  const [searchParams] = useSearchParams()

  return useMemo(() => {
    // If custom breadcrumbs are provided, use them
    if (customItems) {
      return customItems
    }

    // Otherwise, generate from current route
    const breadcrumbs: BreadcrumbItem[] = []
    const { pathname } = location
    const queryParams: Record<string, string> = {}

    // Convert search params to object
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })

    // Always start with home
    breadcrumbs.push({
      label: routeConfig.home.label,
      path: routeConfig.home.path,
    })

    // Find matching route for current path
    const route = findMatchingRoute(pathname)

    if (route) {
      // For simple routes without parents
      if (!route.parent) {
        if (route.path !== '/') {
          // Don't add home twice
          const routeParams = extractParams(route.path, pathname)

          breadcrumbs.push({
            label: route.getLabel
              ? route.getLabel({ ...routeParams, ...queryParams })
              : route.label,
            path: route.getBreadcrumbUrl
              ? route.getBreadcrumbUrl(routeParams, queryParams)
              : pathname,
          })
        }
      }
      // For nested routes, build hierarchy
      else {
        let currentRoute: RouteConfig | null = route
        const routeChain: RouteConfig[] = []

        // Build chain from current route back to parent
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

        // Create breadcrumb for each route in the chain
        routeChain.forEach((chainRoute) => {
          if (chainRoute.breadcrumbVisible !== false) {
            const routeParams = extractParams(chainRoute.path, pathname)

            breadcrumbs.push({
              label: chainRoute.getLabel
                ? chainRoute.getLabel({ ...routeParams, ...queryParams })
                : chainRoute.label,
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
