export type ParsedExcel = {
    filename: string,
    parsedData: FlatJsonObject
}

type FlatJsonObject = {
    [key: string]: string|undefined
}
