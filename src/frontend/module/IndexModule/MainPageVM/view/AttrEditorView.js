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

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

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
        if (componentInEdit === null) {
            return null;
        }
        console.log('componentInEdit: ', componentInEdit);
        return h.div('attr-editor-content', {},
            componentInEdit.displayName
        );
    }

    render() {
        const {local, props} = this;
        const {attrEditorState} = local;
        return h.div('control-panel', {},
            h(
                Drawer,
                'attr-editor-drawer',
                {
                    anchor: 'right',
                    variant: 'persistent',
                    open: props.componentInEdit !== null,
                    // onMouseOut() {
                    //     props.triggerAttrEditorDrawer(false);
                    // }
                },
                this.renderAttrEditorContent()
            )
        );
    }
}
