import { parse } from 'structured-xlsx-parser'
import { ParsedExcel } from './types'

type ExcelFile = {
    filename: string
    data: Uint8Array
}

self.addEventListener('message', (e) => {
    try {
        const excelFiles = e.data as ExcelFile[]
        const parsed = excelFiles.map(it => ({
            filename: it.filename,
            parsedData: parse(it.data, it.filename)
        }))
        const sortedFilenames = parsed.map(it => it.filename).sort()
        const sortedItems = sortedFilenames.map(filename => parsed.find(item => item.filename == filename)) as ParsedExcel[]
        // @ts-ignore
        self.postMessage([ null, sortedItems ])
    } catch (err) {
        // @ts-ignore
        self.postMessage([ err ])
    }
})
