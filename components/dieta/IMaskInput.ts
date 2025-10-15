declare module "react-imask" {
    import type { ComponentType, InputHTMLAttributes } from "react"
  
    export interface IMaskInputProps extends InputHTMLAttributes<HTMLInputElement> {
      mask: string | RegExp | Function
      unmask?: boolean
      prepare?: (value: string) => string
      validate?: (value: string) => boolean
      commit?: (value: string) => void
      overwrite?: boolean
      placeholderChar?: string
      lazy?: boolean
      definitions?: object
      onAccept?: (value: string) => void
      onComplete?: (value: string) => void
    }
  
    export const IMaskInput: ComponentType<IMaskInputProps>
  }
  