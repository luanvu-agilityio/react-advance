import type { ButtonProps } from './Button'
import styled, { css } from 'styled-components'

export const BaseButton = styled.button<ButtonProps>`
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-bold);
  font-size: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variant styles */
  ${(props) =>
    props.variant === 'solid' &&
    css`
      background-color: var(--green-color-default);
      border: 2px solid var(--green-shade-1);
      color: var(--white-color);

      &:hover:not(:disabled) {
        background-color: var(--green-shade-1);
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--green-shade-2);
      }
    `}

  ${(props) =>
    props.variant === 'soft' &&
    css`
      color: var(--black-color-default);
      border: none;

      &:hover:not(:disabled) {
        color: var(--green-color-default);
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--black-shade-3);
      }
    `}

  ${(props) =>
    props.variant === 'outline' &&
    css`
      background-color: transparent;
      color: var(--black-color-default);
      border: 2px solid var(--green-shade-2);

      &:hover:not(:disabled) {
        background-color: var(--green-shade-2);
        color: var(--white-color);
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--green-shade-1);
      }
    `}

  ${(props) =>
    props.variant === 'ghost' &&
    css`
      background-color: var(--black-shade-5);
      color: var(--black-color-default);
      border: none;

      &:hover:not(:disabled) {
        background-color: var(--black-shade-3);
      }

      &:focus {
        box-shadow: 0 0 0 2px var(--black-shade-3);
      }
    `}

  /* Size styles */
  ${(props) =>
    props.size === '1' &&
    css`
      padding: 6px 12px;
    `}

  ${(props) =>
    props.size === '2' &&
    css`
      padding: 12px 16px;
    `}

  ${(props) =>
    props.size === '3' &&
    css`
      padding: 12px 24px;
    `}
`
