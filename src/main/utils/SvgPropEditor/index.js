import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import {capitalize} from 'lodash-es'

import {Icon} from '@befe/brick'

import {ICON_GROUP_MAP_MAIN} from '../../utils/ICON_GROUP_MAP'
import {ICON_TYPES} from '../../config'

import getSvgByName from '../getSvgByName'

import './style.scss'

export default class SvgPropEditor extends React.Component {

  static displayName = 'SvgPropEditor'

  state = {
    visible: false,
    iconTypesArr: [],
    selectedIconType: '',
    selectedTypeSvgList: [],
  }

  static propTypes = {
    // value: ''
  }

  componentDidMount() {
    const iconTypesArr = Object.keys(ICON_GROUP_MAP_MAIN)
    this.setState({
      iconTypesArr,
      selectedIconType: this.getSelectedIconType(),
    })
  }

  getSelectedIconType() {
    const {value} = this.props
    const iconTypesArr = Object.keys(ICON_GROUP_MAP_MAIN)
    let selectedIconType = iconTypesArr[0]
    if (value !== '') {
      for (let typeName of iconTypesArr) {
        const svgNameList = Object.keys(ICON_GROUP_MAP_MAIN[typeName])
        for (let svgName of svgNameList) {
          if (svgName === value) {
            selectedIconType = typeName
            break
          }
        }
      }
    }
    return selectedIconType
  }

  get selectedTypeSvgList() {
    return ICON_GROUP_MAP_MAIN[this.state.selectedIconType] || []
  }

  triggerVisible = tar => {
    if (tar === true) {
      this.setState({
        selectedIconType: this.getSelectedIconType()
      })
    }
    this.setState({
      visible: typeof tar === 'boolean' ? tar : !this.state.visible
    })
  }

  render() {
    const {
      visible,
      iconTypesArr,
      selectedIconType
    } = this.state
    const {
      value,
      onChange,
      dispatchSelectedIcon,
      ...restProps
    } = this.props
    return <div className="svg-prop-editor">
      <TextField
        value={value}
        onClick={() => {
          this.triggerVisible(true)
        }}
        {...restProps}
      />
      <Dialog
        className="svg-editor-dialog"
        onClose={() => {
          this.triggerVisible(false)
        }}
        maxWidth="md"
        open={visible}
      >
        <DialogTitle
          onClose={() => {
            this.triggerVisible(false)
          }}
        >
          <Typography gutterBottom>
            ????????????
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <MenuList
            className="icon-type-menu"
            open={true}
          >
            {
              iconTypesArr.map(type => {
                return <MenuItem
                  key={type}
                  selected={type === selectedIconType}
                  onClick={() => {
                    this.setState({
                      selectedIconType: type,
                    })
                  }}
                >
                  {ICON_TYPES[type]} {capitalize(type)}
                </MenuItem>
              })
            }
          </MenuList>
          <ul
            className="icon-list"
          >
            {
              Object.keys(this.selectedTypeSvgList).map(item => {
                return <Button
                  key={item}
                  className="icon-wrap"
                  variant={item === value ? 'contained' : 'text'}
                  onClick={() => {
                    dispatchSelectedIcon(item)
                    this.triggerVisible(false)
                  }}
                >
                  <Icon
                    className="icon"
                    svg={getSvgByName(item)}/>
                  <p
                    className="icon-name"
                  >
                    {item}
                  </p>
                </Button>
              })
            }
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              dispatchSelectedIcon('')
              this.triggerVisible(false)
            }}
            disabled={value === ''}
          >
            ???????????????
          </Button>
          <Button
            autoFocus
            onClick={() => {
              this.triggerVisible(false)
            }}
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}
