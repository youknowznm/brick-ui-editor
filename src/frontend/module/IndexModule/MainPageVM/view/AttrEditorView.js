import {
    React,
    Component,
    observer,
    inject,
    observable,
    computed,
    reaction,
    h,
    c,
    action,
    toJS,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import SectionForm from '@befe/erp-comps/v2/components/SectionForm';

import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import AttrEditorState from '../states/AttrEditorState';

import compStyle from '../style/attr-editor.use.less';

@inject('app')
@observer
@suh(compStyle)
export default class Comp extends Component {

    static propTypes = {
        // componentInEdit
    };

    local = {
        attrEditorState: new AttrEditorState(),
    };

    constructor(props) {
        super(props);
        const {local} = this;
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    renderAttrEditorContent = () => {
        const {local, props} = this;
        const {componentInEdit} = props;
        // if (componentInEdit === null) {
        //     return null;
        // }
        // const originCompData = componentInEdit.props;
        // console.log('componentInEdit: ', componentInEdit);
        // console.table('originCompData: ', originCompData);
        return h.div('attr-editor-content', {},
            // componentInEdit.displayName
            h.div('title-wrap', {},
                h.h3('title', {}, 'Button'),
                h.p('desc', {}, '按钮'),
            ),
            h.ul('type-position', {},
                h(TextField, {
                    value: '',
                    label: '左边距',
                    size: 'small',
                    style: {
                        width: 150,
                        marginRight: 20,
                    },
                    InputProps: {
                        endAdornment: h(InputAdornment, {
                            position: 'end',
                        }, 'px')
                    },
                    margin: 'dense'
                    
                }),
                h(TextField, {
                    value: '',
                    label: '上边距',
                    style: {
                        width: 150,
                    },
                    InputProps: {
                        endAdornment: h(InputAdornment, {
                            position: 'end',
                        }, 'px')
                    },
                    margin: 'dense'
                }),
                h(TextField, {
                    value: '',
                    label: '宽度',
                    style: {
                        width: 150,
                        marginRight: 20,
                    },
                    InputProps: {
                        endAdornment: h(InputAdornment, {
                            position: 'end',
                        }, 'px')
                    },
                    margin: 'dense'
                    
                }),
                h(TextField, {
                    value: '',
                    label: '高度',
                    style: {
                        width: 150,
                    },
                    InputProps: {
                        endAdornment: h(InputAdornment, {
                            position: 'end',
                        }, 'px')
                    },
                    margin: 'dense'
                }),
            )
        );
    }

    render() {
        const {local, props} = this;
        const {attrEditorState} = local;
        return h.div('attr-editor', {},
            h(
                Drawer,
                'attr-editor-drawer',
                {
                    anchor: 'right',
                    variant: 'persistent',
                    open: true,
                    // open: props.componentInEdit !== null,
                },
                this.renderAttrEditorContent()
            )
        );
    }
}
