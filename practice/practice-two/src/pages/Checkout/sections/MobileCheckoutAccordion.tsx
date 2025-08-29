'use client'
import { ChevronDown, Check, CheckIcon } from 'lucide-react'

import {
  StyledAccordion,
  StyledItem,
  StyledHeader,
  StyledTrigger,
  StyledContent,
  StepInfo,
  StepMeta,
  ChevronIcon,
  StepDescription,
  StepTitle,
  StepIndicator,
} from '../CheckoutStyle'
import type { ReactNode } from 'react'

interface CheckoutStep {
  id: string
  title: string
  stepNumber: string
  isComplete: boolean
  content: ReactNode
  description?: string
}

interface MobileCheckoutAccordionProps {
  steps: CheckoutStep[]
  currentStep: string
  onStepChange: (step: string) => void
}

export const MobileCheckoutAccordion = ({
  steps,
  currentStep,
  onStepChange,
}: MobileCheckoutAccordionProps) => {
  return (
    <StyledAccordion
      type="single"
      defaultValue={currentStep}
      collapsible
      onValueChange={onStepChange}
    >
      {steps.map((step) => (
        <StyledItem key={step.id} value={step.id}>
          <StyledHeader>
            <StyledTrigger>
              <StepInfo>
                <StepMeta>
                  {step.isComplete && (
                    <CheckIcon>
                      <Check size={20} />
                    </CheckIcon>
                  )}
                  <StepTitle>{step.title}</StepTitle>
                </StepMeta>
                <StepMeta>
                  <StepIndicator>{step.stepNumber}</StepIndicator>
                  <ChevronIcon>
                    <ChevronDown size={20} />
                  </ChevronIcon>
                </StepMeta>
              </StepInfo>
              <StepDescription>
                {step.description ?? 'Please enter your information'}
              </StepDescription>
            </StyledTrigger>
          </StyledHeader>
          <StyledContent>{step.content}</StyledContent>
        </StyledItem>
      ))}
    </StyledAccordion>
  )
}
