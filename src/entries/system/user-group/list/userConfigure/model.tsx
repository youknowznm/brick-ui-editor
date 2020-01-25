type int = number;
type Integer = int;
type Date = string;
type List<Item> = Array<Item>;

export interface TypeUserGroupList {
    gId?: int
    groupCode?: string
    groupName?: string	        //用户组名称
    remark?: string	            //备注
    inUse?: string	            //是否删除
    createdBy?: string	        //创建者uuap
    creationDate?: Date      	//创建时间
    createdName?: string	    //创建者姓名
    createdId?: Integer	        //创建者id
    lastUpdatedBy?: string   	//最新更新者uuap
    lastUpdatedName?: string  	//最新更新者姓名
    lastUpdatedId?: Integer	    //最新更新者id
    lastUpdateDate?: Date	    //最新更新者时间
    openUsers?: int	            //启用成员数量
    closeUsers?: int 	        //停用成员数量
    userGroupRecordVOS: List<TypeUserGroupRecordVO>	//组内成员
    businessGroup?: string	    //租户
    showClose?: string	        //是否显示未启用用户
    total?: string
}

interface StandardUserGroupRecordVO {
    uId?: int
    userUuap?: string	        //用户uuap
    userName?: string	        //用户名称
    userEmail?: string	        //用户邮箱
    userDepartment?: string	    //用户部门名称
    departmentCode?: string     //部门编号
    groupCode?: string          //用户组编号
    userStatus?: string	        //用户状态(是否为共享中心用户)
    inUse?: string	            //是否启用
    openTime?: Date	            //启用时间
    closeTime?: Date	        //停用时间
    createdBy?: string	        //创建者uuap
    createdName?: string	    //创建者姓名
    createdId?: Integer	        //创建人id
    creationDate?: Date	        //创建时间
    lastUpdatedBy?: string	    //最新更新者uuap
    lastUpdatedName?: string	//最新更新者姓名
    lastUpdatedId?: Integer     //最新更新者id
    lastUpdateDate?: Date	    //最新更新时间
}

export type TypeUserGroupRecordVO = StandardUserGroupRecordVO & {
    //实际的用户部门名称
    departmentName?: string
    //未知
    hId?: number
    //未知
    businessGroup?: string
    //未知
    groupStatus?: string
    //未知
    groupName?: string
}