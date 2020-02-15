import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _FileList from '../composedComps/FileList'
const FileList = wrapDemoComp(_FileList)

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
        {/* ===== 1 layout ===== */}
        <h3 className="demo-type-desc">排列方式</h3>
        <div>
            <FileList data={fileData} layout={'horizontal'}/>
            <FileList data={fileData} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 actions ===== */}
        <h3 className="demo-type-desc">操作</h3>
        <div>
            <FileList data={fileDataWithActions} useRemove={true} layout={'horizontal'} downloadMethod={'get'}/>
            <FileList data={fileDataWithActions} useRemove={true}/>
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

FileListDemo.wrapName = 'FileListDemo'

export default FileListDemo
