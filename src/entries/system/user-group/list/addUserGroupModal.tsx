import * as React from 'react'
import {Button, Checkbox, Dialog, Input} from '@befe/brick'
import {SvgMarkCross} from '@befe/brick-icon'
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {MyForm, TypeMyFormProps} from "src/components/form";
import {initTextArea} from "src/components/initComponent/init-text-area";
import {initTextInput} from "src/components/initComponent";
import {MySection} from "src/components/section";
import {postAddUserGroup} from 'src/services/system/user-group-api';
import './addUserGroup.mod.scss';
import {postSuggest} from "../../../../services/common-api";

type TypeUser = {
    userName: string
    userUuap: string
    userDepartment: string
    checked: boolean
}

type TypeProps = {
    isShow: boolean
    onClose: () => void
}

const EMPTY_MODAL_DATA = {
    'groupName': '',
    'remark': ''
};

@observer
export class AddUserModal extends React.PureComponent<TypeProps> {

    @observable
    selectedUserFilter = '';
    @observable
    baseData = {
        'groupName': '',
        'remark': ''
    };
    @observable
    unSelectedUsersList: Array<TypeUser> = [];
    @observable
    selectedUsersList: Array<TypeUser> = [];
    addNewGroupModalConfig: TypeMyFormProps = {
        sectionTitle: '基本信息',
        fieldSet: {
            groupName: {
                label: '名称',
                component: initTextInput(this.baseData, {key: 'groupName'}),
                colSpan: 12,
                required: true,
            },
            remark: {
                label: '备注',
                component: initTextArea(this.baseData, {key: 'remark'}),
                colSpan: 24,
            }
        },
        fieldsOrder: [
            [
                'groupName'
            ], [
                'remark'
            ]
        ]
    };

    saveAddUserGroup = (): void => {
        const data = {
            ...this.baseData,
            fsscUsers: this.selectedUsersList.slice()
        };
        postAddUserGroup(data).then(res => {
            console.log(res)
        });

        this.resetModal();

        this.props.onClose();
    };

    cancelAddUserGroup = (): void => {
        this.resetModal();
        this.props.onClose();
    };

    @computed
    get showSelectedUser(): Array<TypeUser> {
        console.log(this.selectedUserFilter);
        if (this.selectedUserFilter === '') {
            return this.selectedUsersList;
        }

        return this.selectedUsersList.filter(user => {
            const {userName, userUuap, userDepartment} = user;
            const value = this.selectedUserFilter;
            return userName.indexOf(value) !== -1
                || userUuap.indexOf(value) !== -1
                || userDepartment.indexOf(value) !== -1
        })
    }

    @action
    setUnselectedUsersList = (list: Array<TypeUser>): void => {
        list = list.map(user => {
            if (this.selectedUsersList.some( item => item.userUuap === user.userUuap)) {
                Object.assign(user, {checked: true});
            }
            else {
                Object.assign(user, {checked: false});
            }
            return user;
        });
        this.unSelectedUsersList = list;
    };

    searchUnselectedUsers = (value: string): void => {
        postSuggest({
            keyWord: value,
            pageSize: 50,
            dataType: 'USER'
        }).then(res => {
            this.setUnselectedUsersList(res ? res : []);
        })
    };

    @action
    searchSelectedUsers = (value: string): void => {
        this.selectedUserFilter = value;
    };

    @action
    selectUser = (user: TypeUser, index: number): void => {
        this.selectedUsersList.unshift(user);
        this.setUnselectedUsersList(this.unSelectedUsersList);
    };

    @action
    unselectUser = (user: TypeUser, index: number): void => {
        this.selectedUsersList.splice(index, 1);
        this.setUnselectedUsersList(this.unSelectedUsersList);
    };

    @action
    selectAll = (): void => {
        this.unSelectedUsersList.map(user => {
            if (!user.checked) {
                this.selectedUsersList.push(user);
            }
        });

        this.setUnselectedUsersList(this.unSelectedUsersList);
    };

    @action
    unselectAll = (): void => {
        this.selectedUsersList = [];
        this.setUnselectedUsersList(this.unSelectedUsersList);
    };

    @action
    resetModal = (): void => {
        Object.assign(this.baseData, EMPTY_MODAL_DATA);
        this.selectedUsersList = [];
        this.unSelectedUsersList = []
    };

    RenderUnselectedBox = observer((): React.ReactElement => {
        return (
            <div>
                {
                    this.unSelectedUsersList.map((user, index) => {
                        if (user.checked) {
                            return null
                        }
                        return (
                            <div key={index} styleName={'box-content-item'}>
                                <span styleName={'content-item-span'}>
                                    {`${user.userName}(${user.userUuap} ${user.userDepartment})`}
                                </span>
                                <Checkbox
                                    styleName={'content-item-action-checkbox'}
                                    onClick={(): void => {this.selectUser(user, index)}}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    });

    RenderSelectedBox = observer((): React.ReactElement => {
        console.log(this.showSelectedUser);
        return (
            <div>
                {
                    this.showSelectedUser.map((user, index) => {
                        return (
                            <div key={index} styleName={'box-content-item'}>
                                <span styleName={'content-item-span'}>
                                    {`${user.userName}(${user.userUuap} ${user.userDepartment})`}
                                </span>
                                <Button
                                    styleName={'content-item-action-button'}
                                    icon={SvgMarkCross}
                                    size={'xs'}
                                    type={'plain'}
                                    onClick={(): void => {this.unselectUser(user, index)}}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    });

    renderShuttleBox = (): React.ReactElement => {
      return (
          <div styleName={'add-user-group-shuttle-boxes'}>
              <div styleName={'unselected-users'}>
                  <div styleName={'box-head'}>
                      <span>未选对象</span>
                      <Button
                          styleName={'action-button'}
                          color={'primary'}
                          type={'plain'}
                          onClick={this.selectAll}
                      >全选</Button>
                  </div>
                  <Input onPressEnter={(e: any) => {this.searchUnselectedUsers(e.target.value)}} />
                  <div styleName={'box-content'}>
                      <this.RenderUnselectedBox />
                  </div>
              </div>
              <div styleName={'selected-users'}>
                  <div styleName={'box-head'}>
                      <span>已选对象</span>
                      <Button
                          styleName={'action-button'}
                          color={'primary'}
                          type={'plain'}
                          onClick={this.unselectAll}
                      >清空</Button>
                  </div>
                  <Input onPressEnter={(e: any) => {this.searchSelectedUsers(e.target.value)}} />
                  <div styleName={'box-content'}>
                      <this.RenderSelectedBox />
                  </div>
              </div>
          </div>
      )
    };

    render() {
        return (
            <Dialog
                headline={'新增'}
                size={'md'}
                visible={this.props.isShow}
                onCancel={this.cancelAddUserGroup}
                onConfirm={this.saveAddUserGroup}
            >
                <MyForm {...this.addNewGroupModalConfig} />
                <MySection title={'用户信息'}>
                    {this.renderShuttleBox()}
                </MySection>
            </Dialog>
        );
    }
}

