export type ParsedExcel = {
    filename: string,
    parsedData: JsonObject
}

type JsonObject = {
    [key: string]: JsonObject|string|undefined
}
