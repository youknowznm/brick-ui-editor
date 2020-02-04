import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {FileList} from '@befe/brick'

import {FileList as OriginFileList} from '@befe/brick'
const FileList = wrapDemoComp(OriginFileList)

const FileListDemo = () => {

    const fileData = [
        {
            id: 'img-file',
            type: 'img',
            name: 'logo.png',
        },
        {
            id: 'excel-file',
            type: 'excel',
            name: 'report.xls',
        },
        {
            id: 'pdf-file',
            type: 'pdf',
            name: 'book.pdf'
        }
    ];

    const fileDataWithActions = [
        {
            id: 'img-file',
            type: 'img',
            name: 'logo.png',
            previewUrl: 'https://www.baidu.com/img/bd_logo1.png',
            downloadUrl: 'https://www.baidu.com/img/bd_logo1.png'
        },
        {
            id: 'excel-file',
            type: 'excel',
            name: 'report.xls',
            progress: true
        },
        {
            id: 'pdf-file',
            type: 'pdf',
            name: 'book.pdf',
            error: '上传文件出错'
        }
    ];

    return <div className="demo-block file-list-demo-block">
        {/* ===== 0 basic ===== */}
        <FileList data={fileData}/>
        <Divider className="demo-block-separator" />
        {/* ===== 1 layout ===== */}
        <FileList data={fileData} layout={'horizontal'}/>
        <FileList data={fileData} />
        <Divider className="demo-block-separator" />
        {/* ===== 2 actions ===== */}
        <FileList data={fileDataWithActions} useRemove={true} layout={'horizontal'} downloadMethod={'get'}/>
        <FileList data={fileDataWithActions} useRemove={true}/>
    </div>
}

export default FileListDemo
