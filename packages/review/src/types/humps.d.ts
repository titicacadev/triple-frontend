declare namespace humps {
  type Obj = { [key: string]: any }

  function camelize(value: string): string
  function pascalize(value: string): string
  function decamelize(
    value: string,
    optionsOrProcessor?: OptionOrProcessor,
  ): string
  function depascalize(
    value: string,
    optionsOrProcessor?: OptionOrProcessor,
  ): string

  function camelizeKeys(
    str: Obj[],
    optionsOrProcessor?: OptionOrProcessor,
  ): Obj[]
  function camelizeKeys(str: Obj, optionsOrProcessor?: OptionOrProcessor): Obj

  function pascalizeKeys(
    str: Obj[],
    optionsOrProcessor?: OptionOrProcessor,
  ): Obj[]
  function pascalizeKeys(str: Obj, optionsOrProcessor?: OptionOrProcessor): Obj

  function decamelizeKeys(
    str: Obj[],
    optionsOrProcessor?: OptionOrProcessor,
  ): Obj[]
  function decamelizeKeys(str: Obj, optionsOrProcessor?: OptionOrProcessor): Obj

  function depascalizeKeys(
    str: Obj[],
    optionsOrProcessor?: OptionOrProcessor,
  ): Obj[]
  function depascalizeKeys(
    str: Obj,
    optionsOrProcessor?: OptionOrProcessor,
  ): Obj

  interface HumpsOptions {
    separator?: string
    split?: RegExp
    process?: HumpsProcessor
  }
  interface HumpsProcessor {
    (
      key: string,
      convert: HumpsProcessorParameter,
      options?: HumpsOptions,
    ): string
  }
  interface HumpsProcessorParameter {
    (key: string, options?: HumpsOptions): string
  }
  type OptionOrProcessor = HumpsOptions | HumpsProcessor
}

declare module 'humps' {
  export = humps
}
