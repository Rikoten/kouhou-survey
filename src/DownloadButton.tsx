import React from 'react'

export const DownloadButton: React.FunctionComponent<{
    disabled?: boolean,
    file: string|Uint8Array,
    filename: string,
    text: string
}> = ({ file, filename, disabled, text }) => {
    if (typeof file === 'string') {
        const onClickHandler: React.MouseEventHandler = e => {
            if (disabled) e.preventDefault()
        }
        const downloadText = 'data:,' + file

        return <div className='DownloadButton'>
            <a download={ filename } href={ downloadText } data-disabled={ disabled } onClick={ onClickHandler }>{ text }</a>
        </div>
    } else {
        const objectUrl = URL.createObjectURL(new File([file.buffer], filename))
        const onClickHandler: React.MouseEventHandler = e => {
            if (disabled) e.preventDefault()
            setTimeout(() => {
                URL.revokeObjectURL(objectUrl)
            }, 3000)
        }

        return<div className='DownloadButton'>
            <a download={ filename } href={ objectUrl } data-disabled={ disabled } onClick={ onClickHandler }>{ text }</a>
        </div>
    }
}
