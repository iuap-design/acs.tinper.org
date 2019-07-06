
## 第一章 基础概念
### 1.1 背景
开发过程中经常遇到一些限定输入（也即下拉选择输入）场景，有的备选项信息简单，有的备选项信息复杂；有的备选项可以穷举，有的备选项会持续扩展。有的是单项选取，有的是多项选取；有的无需关联查找，有的需关联查找……面对此类复杂的开发需求，常规的下拉输入框等控件是不能满足要求的，为此IUAP提供了一套参照组件，用来解决类似的问题，提高开发效率。

使用参照的场景通常满足以下几个要求。第一，用户需要填写的数据不可以随意填写，且已经存在于数据库。第二，这些数据是一些常用和固定的数据，如组织、部门、人员、岗位等。第三，用户在选择数据时需要进行权限过滤，以防止用户越权选择自己无权管理的数据。

举个简单的例子。一个经理创建了一个任务，需要把这个任务分配下去。那么他在选择分配的人员时，这个人员一定是他部门存在的人，而不是其他部门或者不存在的人。这时，选择人员这个地方就需要做成一个人员参照。


### 1.2 名词解释
参照组件是IUAP对外提供的一套UI组件，基于React开发，它提供固定的几种界面样式，用户可以按照规定的形式提供参数，即可实现完整的交互逻辑。



## 第二章 技术架构
### 2.1 架构设计
    参照目前为止存在了3个版本的设计，前两版的设计都是提供了一个统一的代理服务进行服务转发，代理服务分别为uitemplate_web以及newref；其中uitemplate_web是基于tinper的uui的开发规范的一套公共组件参照；而newref则是基于tinper的react的开发规范的组件；两套模式下，都由uitemplate_web以及newref负责给前端参照控件提供服务，前端开发时，需要携带refCode参照编码，后端参照服务，通过在参照表refinfo表中注册的参照信息，获取参照resturl地址，并进行服务的转发到业务参照实现的后端，请求相关的服务接口，如表格、树等搜索查询的接口；

![image](https://user-images.githubusercontent.com/33412781/60429529-d4d98f80-9c2d-11e9-9a2e-df64af02d08c.png)

    基于以上设计的情况下，可以看到参照请求的调用链路较长，出现问题不容易排查；故做了以下的设计：

1. 前端业务模块开发UI的时候，可以依赖参照yyref组件
2. 后端开发依赖pap-ref-sdk，并按照开发规范设置参照模型
3. 前端发送加载参照请求直接到业务模块后台，并根据模型配置进行业务相关信息的获取，并返回数据给前端控件；

![image](https://user-images.githubusercontent.com/33412781/60429583-ede24080-9c2d-11e9-9d33-74adea67c7b2.png)



### 2.2 实现说明
    提供了两种方式，一种是基于ref.xml描述实现对树形参照、表形参照、树表形参照、树穿梭框参照的开发；另一种可以通过实现不同类型的参照抽象模型类进行参照服务开发

* 提供了工具方法进行参照的id转换name的方法，以满足在数据查询时候，参照pk与name转换显示的场景
    * 参数Map<String,List<String>>的key是refcode，value是ids的数组
    * 返回值Map<String,List<Map<String, Object>>>的key是refcode，value是map返回值的list数组
> Map<String,List<Map<String, Object>>> com.yonyou.iuap.pap.base.ref.utils.RefIdToNameUtil#convertIdToName(Map<String,List<String>>) 

* 需要在application.properties中配置

    * workbench.newref.url需要配置为环境中newref服务地址，形如:
    workbench.newref.url=http://172.20.52.123:80
    
    * buzi.ids.url需要配置为环境中业务服务参照地址信息，形如：
    buzi.ids.url=http://172.20.52.123:80

    RefIdToNameUtil#convertIdToName实现原理：由于在微服务得情况下，参照区分为本地参照以及远程参照，即是否是当前模块提供得参照服务；决定是否远程调用，详细步骤如下所示：
    * 通过refcode在ref.xml中进行查找，判断是否是当前模块得参照
    * 如果明确是当前模块得参照，则直接可以利用当前数据源进行数据库操作，提供参照的convertLocalIdToName服务
    * 如果不是当前模块得参照，通过newref提供得查询参照模型服务，确定参照得版本refversion，如果是1.0_common,则进行newref远程服务调用；如果是2.0_common或者2.0_ext则进行业务服务得远程调用；进行远程服务的restful调用，提供convertRemoteIdToName服务


### 2.3 参照模型

表名REF_REFINFO

| 列名 | 字段含义 | 类型 
---|---|---
PK_REF | 主键 | VARCHAR2(200)
REFNAME | 参照名称（简体） | VARCHAR2(300)
REFCODE | 参照编码 | VARCHAR2(300)
REFCLASS | 参照类 | VARCHAR2(300)
REFURL | 参照的URL | VARCHAR2(300)
MD_ENTITYPK | 元数据实体主键 | VARCHAR2(300)
PRODUCTTYPE | 产品类型 | VARCHAR2(300)
TENANTID | 租户id | VARCHAR2(300)
REFVERSION | 参照版本 | VARCHAR2(100)
REFNAME2 | 参照名称（英语） | VARCHAR2(300)
REFNAME3 | 参照名称(繁体) | VARCHAR2(300)
REFNAME4 | 参照名称 | VARCHAR2(300)
REFNAME5 | 参照名称 | VARCHAR2(300)
REFNAME6 | 参照名称 | VARCHAR2(300)

>>
    注意：refcode需要唯一
    refversion目前有三个值：分别为1.0_common、2.0_common、2.0_ext
    1.0_common表示的是uui版本的参照或者非ref.xml模式下的参照
    2.0_common表示的是基于ref.xml模式下的参照,不设置的情况下，默认按照该版本处理逻辑，建议默认使用该版本
    2.0_ext表示基于抽象类实现方式实现的参照




## 第三章 功能介绍
### 3.1 参照类型说明
| 类型名称 | 类型编码 | 类型值 |
-|-|-
树形参照 | *PapCommonTree* | 1
表格参照 | *PapCommonTable*| 2
树表参照 | *PapCommonTreeTable* | 3
树穿梭框参照 | *PapCommonTreeTransfer* | 4
~~复杂查询表格参照~~ | ~~*RefMultipleSelection*~~| 5
~~常规类型~~ | ~~*RefCombo*~~ | 6
下拉参照 | *PapCommonCombobox* | 


### 3.2 特性说明
#### 1. 树形参照
* **单一树**支持特性
    * 单选、多选
    * 简单查询
    * 懒加载
    * 数据权限
    * 级联过滤
    * 已选、备选页签切换
    * 提供清空按钮
    * 懒加载多选

![image](https://user-images.githubusercontent.com/33412781/60429619-0a7e7880-9c2e-11e9-98fe-e27373732871.png)

* **组合树**支持特性
    * 单选、多选
    * 简单查询
    * 懒加载
    * 数据权限
    * 级联过滤
    * 自定义图标显示
    * 已选、备选页签切换
    * 提供清空按钮
    * 懒加载多选
* 未支持特性
    * 快捷录入
* **问题**
    * 组合树选值问题：子树选中父树不可选中
    * 树形参照懒加载模式下三角号交互问题

![image](https://user-images.githubusercontent.com/33412781/60429649-1b2eee80-9c2e-11e9-91ce-85f3d053ad1b.png)

#### 2. 表格参照
* 支持特性
    * 单选、多选
    * 分页
    * 简单查询
    * 复杂查询
    * 已选择
    * 数据权限
    * 级联过滤
    * 提供清空按钮
* 未支持特性
    * 快捷录入

![image](https://user-images.githubusercontent.com/33412781/60429672-2bdf6480-9c2e-11e9-9a3a-713f9b633e2a.png)

#### 3. 树表参照
* 支持特性
    * 单选、多选
    * 简单查询
    * 数据权限
    * 自定义图标显示
    * 提供清空按钮
    * 组合树提供entityType进行查询
    * 数据提供fid，通过fid进行树标记选择
* 待场景验证特性
    * 懒加载
    * 级联过滤
* 未支持特性
    * 快捷录入

![image](https://user-images.githubusercontent.com/33412781/60429706-3c8fda80-9c2e-11e9-849d-31325bce2dac.png)

#### 4. 穿梭框
* 支持特性
    * 单选
    * 多选
    * 简单查询
    * 数据权限
    * 提供清空按钮
* 待场景验证特性
    * 懒加载
    * 级联过滤
    * 自定义图标显示
* 未支持特性
    * 快捷录入
    * 组合树提供entityType进行查询
    * 数据提供fid，通过fid进行树标记选择

![image](https://user-images.githubusercontent.com/33412781/60429726-487b9c80-9c2e-11e9-9de9-af21e8ceb1d3.png)

#### 5. 下拉参照

暂无

### 6. 常规类型 

暂不支持

### 3.3 开发描述说明

#### 3.3.1 常规性参照开发
常规性开发基于ref.xml开发的参照在模型注册时候的版本refversion为2.0_common
##### 3.3.1.1 基于ref.xml开发
1. 树形参照
```
<?xml version="1.0" encoding="utf-8"?>
<root>
    <RefViewModelVO code="xxx" name="xxx" type="1"  >
        <thead>
            <field code="xxx">xxx</field>
                ...
        </thead>
        <tableTree name="ORG_ORGANIZATION">
            <field code="xxx">xxx</field>
                ...
        </tableTree>
    </RefViewModelVO>
</root>
```

2. 表格参照
```
<?xml version="1.0" encoding="utf-8"?>
<root>
    <RefViewModelVO code="xxx" name="xxx" type="2"  >
        <thead>
            <field code="xxx">xxx</field>
                ...
        </thead>
        <table name="xxx">
            <field code="xxx">xxx</field>
                ...
        </table>
    </RefViewModelVO>
</root>
```
3. 树表参照
```
<?xml version="1.0" encoding="utf-8"?>
<root>
    <RefViewModelVO code="xxx" name="xxx" type="3" >
        <thead>
            <field code="xxx">xxx</field>
                ...
        </thead>
        <tableTree name="xxx">
            <field code="xxx">xxx</field>
                ...
        </tableTree>
        <table name="xxx">
            <field code="xxx">xxx</field>
                ...
        </table>
    </RefViewModelVO>
</root>
```
4. 穿梭框
    
    与树表配置等都一致，唯一区别之处在于type的值为4

```
<?xml version="1.0" encoding="utf-8"?>
<root>
    <RefViewModelVO code="xxx" name="xxx" type="4" >
        <thead>
            <field code="xxx">xxx</field>
                ...
        </thead>
        <tableTree name="xxx">
            <field code="xxx">xxx</field>
                ...
        </tableTree>
        <table name="xxx">
            <field code="xxx">xxx</field>
                ...
        </table>
    </RefViewModelVO>
</root>
```
5. 常规类型 *暂不支持*

##### 3.3.1.2 ref.xml文件说明

    通过上述树形参照、表格参照、树表参照、穿梭框的配置文件的查看，进行以下的说明及介绍：
* RefViewModelVO表示参照的模型
>    ```
>    <RefViewModelVO code="xxx" name="xxx" i18nkey="" type="4" >
>       ...
>    </RefViewModelVO>
>    ```
* 其属性设置如下：
    * code表示参照编码，用于前端使用
    * name表示参照名称
    * i18nkey用于设置参照名称支持国际化资源文件中的key，形如：``ja.ref.res5.0001``
    * type用于设置参照类型(1-6)，具体值含义请参考 3.1参照类型说明 小节

* *thead 表头，没有需要设置的属性，列表需要展示的字段以field进行设置，用以在表格参照或者树表参照场景下*
> ``<thead>...</thead>``
* 以*field*方式设置表头字段，形式如下：
    > ``<field code="name" i18nkey="" i18n="true">组织名称</field>``
    * 属性code后台返回数据对应的key值
    * value用于设置表头名称
    * i18nkey用于设置该属性列的国际化资源文件中的key，形如：``ja.ref.res5.0001``
    * i18n非必填，用于标记多语字段；如name字段支持国际化，并进行数据国际化显示

* table 表格，用以在表格参照或者树表、树穿梭参照场景下，其属性设置如下：
    > ``<table name="xxx">...</table>``
    * name属性，列表对应的数据库表名，必填
    * 以field方式设置表格字段内容，形式如下：
        > ``<field code="id">ID</field>``
        * 属性code值有以下几种类型:
            * refpk 数据库中主键的字段名
            * refcode 数据库中“编码”的字段名，必填
            * refname 数据库中“名称”的字段名，必填
            * id 数据库中“id”的字段名，必填，表示主键
            * extension 扩展的查询字段；可配置多个，非必填，可以和*thead*中的code值进行对应
                > ``<field code="extension">name</field>``

                > ``<field code="extension">login_name</field>``
            * condition 静态查询条件sql，可配置多个，非必填
                > ``<field code="condition">and enable=1</field>``
            * sort 排序，*order*属性设置排序方式非必需默认为asc升序，value设置排序字段
                > ``<field code="sort" order="asc">ID,CODE</field>``
            * fid 用于设置表格的外键，使用场景在树表、树穿梭的场景下，该场景下fid的值来源于树点击时传递的树主键，前端通过约定condition传递（与上面提到的condition不是一个含义），可配置多个
                > ``<field code="fid" ref="xxx">ORGID</field>``
                * fid在表格中使用，只存在于树表及树穿梭框的场景下，ref需要设置的值为对应的树的name以建立关系
                * 当树表及树穿梭框中树是两个实体的组合树，则可以设置多个fid分别对应组合树的不同实体，以解决当点击组合树不同的节点时，以不同实体的主键加载该实体关联的子表
            * tenant 非必填，用于设置多租户的租户字段
            * sysId 非必填，用于设置多应用的应用字段
            * xxx 可以设置其他具体属性，用于表格属性显示
            * dataPermission 对应数据权限的资源id，非必填，不填默认为RefViewModelVO中code（参照编码），管理员开启所有权限；前端通过clientParam={"isUseDataPower":"true"}开启数据权限过滤，clientParam={"isUseDataPower":"false"}或不填关闭数据权限过滤
                > ``<field code="dataPermission">newuser</field>``
        * filters复杂查询区域条件设置，用于多条件搜索；content前端约定传输搜索条件
            * content：字符串，like默认按照refcode or refname进行模糊搜索，可以通过likeSearchField设置，修改为需要的进行模糊搜索的字段
            * content：json多条件搜索（json的key值与filter的code一致）
        ```
        <filters>
            <filter code="code" value="like"/>
            <filter code="likeSearchField" value="name,code"/>
            ...
        </filters>
        ```
        * code对应数据库字段值，value 条件，用于设置操作符,操作符以数据库语法为准

* tableTree 树，用以在树参照或者树表、树穿梭参照场景下，其属性设置如下：
    > ``<tableTree name="xxx">...</tableTree>``
    * name属性，树对应的数据库表名，必填
    * 以field方式设置树字段内容，形式如下：
    > ``<field code="id">ID</field>``
    * 属性code值有以下几种类型:
        * id、refpk、refcode、refname、extension、condition、sort、tenant、sysId、dataPermission、filters 该部分类型与上述表中的含义、用法一致，请参考上述部分
        * 树与表的区别部分如下：
        * pid 数据库中“树节点”的上级父节点的字段名，必填，前端通过约定treeNode传递

* subTree 子树，用以在树参照或者树表、树穿梭参照场景下且该树是由多个实体组合而成的树，其属性设置如下：
    > ``<subTree name="xxx">...</subTree>``
    * name属性，树对应的数据库表名，必填
    * 以field方式设置树字段内容，形式如下：
    > ``<field code="id">ID</field>``
    * 属性code值有以下几种类型:
        * id、refpk、refcode、refname、extension、condition、sort、tenant、sysId、dataPermission、filters、pid 该部分类型与上述树tableTree中的含义、用法一致，请参考上述部分
        * subTree与tableTree的区别部分如下：
    > ``<field code="fid">ORGANIZATION_ID</field>``
    * fid 用于设置组合树的子实体的外键，通过fid的设置确定组合树的主子树之间的关系

##### 3.3.1.3 能力变更清单
* 3.5.6版本新增属性：
    * tenant 用于支持多租户能力
    * sysId 用于支持多应用能力
    * 表头新增i18n标记字段为多语字段列，用于实现数据多语
    * 表格新增属性
        * fid 用于支持树表、树穿梭框的场景下，与树联动设置
    * 树新增能力
        * 提供subTree支持组合树
//TODO前端补充

#### 3.3.2 基于参照抽象模型类扩展开发
扩展开发的参照在进行模型注册时候的版本refversion为2.0_ext
1. 树形参照
* 继承`com.yonyou.iuap.pap.base.ref.model.AbstractRefTreeModel`抽象类实现以下方法
* `getRefModelInfo`方法用于获取参照基本信息
* `filterRefJSON`方法用于快捷录入模糊搜索
* `matchPKRefJSON`方法用于过PK等信息获取参照值对象,同步校验常用数据，防止无效数据
* ~~`matchBlurRefJSON`方法用于通过name等信息获取参照值对象,对手工录入数据的校验,防止无效数据~~
* `blobRefTree`方法用于获取参照数据
2. 表格参照
* 继承`com.yonyou.iuap.pap.base.ref.model.AbstractRefTableModel`抽象类实现以下方法
* `getRefModelInfo`方法用于获取参照基本信息
* `filterRefJSON`方法用于快捷录入模糊搜索
* `matchPKRefJSON`方法用于过PK等信息获取参照值对象,同步校验常用数据，防止无效数据
* ~~`matchBlurRefJSON`方法用于通过name等信息获取参照值对象,对手工录入数据的校验,防止无效数据~~
* `blobRefTreeGrid`方法用于表体数据查询信息
3. 树表\穿梭框参照
* *树表与穿梭框*在实现服务和方法上没有区别只是在`setRefUIType`值不同，分别为`RefUITypeEnum.RefTreeTable`、`RefUITypeEnum.RefTreeTransfer`
* 继承`com.yonyou.iuap.pap.base.ref.model.AbstractRefTreeTableModel`抽象类实现以下方法
* `getRefModelInfo`方法用于获取参照基本信息
* `filterRefJSON`方法用于快捷录入模糊搜索
* `matchPKRefJSON`方法用于过PK等信息获取参照值对象,同步校验常用数据，防止无效数据
* ~~`matchBlurRefJSON`方法用于通过name等信息获取参照值对象,对手工录入数据的校验,防止无效数据~~
* `blobRefTree`方法用于获取参照数据
* `blobRefTreeGrid`方法用于表体数据查询信息
4. 常规类型 *暂不支持*
* 继承`com.yonyou.iuap.pap.base.ref.model.AbstractCommonRefModel`抽象类实现以下方法
* `getRefModelInfo`方法用于获取参照基本信息
* `filterRefJSON`方法用于快捷录入模糊搜索
* `matchPKRefJSON`方法用于过PK等信息获取参照值对象,同步校验常用数据，防止无效数据
* ~~`matchBlurRefJSON`方法用于通过name等信息获取参照值对象,对手工录入数据的校验,防止无效数据~~
* `commonRefsearch`方法用于查询常规类型数据

#### 3.3.3 基于pap-refer开发参照前端
* npm需要依赖的组件
> "pap-refer": "3.5.6",

  1.树形参照
* 使用pap-common-tree提供的API进行调用

```javascript
import RefTreeWithInput from'pap-refer/lib/pap-common-tree/src/index.js'; 
import "pap-refer/lib/pap-common-tree/src/index.css";
    
    <div className="demo-label">
        <span >单选（组织）：</span>
        <RefTreeWithInput
            title={'组织'}

            param={{
                "refCode": "neworganizition_tree"
            }}
            refModelUrl={{
                treeUrl: '/pap_basedoc/common-ref/blobRefTree',
            }}
            matchUrl='/pap_basedoc/common-ref/matchPKRefJSON'
            filterUrl='/pap_basedoc/common-ref/filterRefJSON'
            multiple={false}
            searchable={true}
            checkStrictly= {true}
            strictMode = {true}
            displayField='{code}' nodeDisplay='{code}'
            valueField='refpk'

            {...getFieldProps('code', {
                initialValue: '{"refname":"","refpk":""}',
                rules: [{
                    message: '提示：请选择组织',
                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                }]
            })}
        />
        <span style={{
            color: 'red'
        }}>
            {
                getFieldError('code')
            }
        </span>
    </div>
```

2.表格参照
* 使用pap-common-table提供的API进行调用

```javascript
import RefMultipleTableWithInput  from 'pap-refer/lib/pap-common-table/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css'

<RefMultipleTableWithInput
    title={<FormattedMessage id="js.com.Ref2.0002" defaultMessage="职级" />}
    strictMode={true}
    backdrop = {false}
    lang={uLocale}
    param = {{//url请求参数
        refCode:'post_level',//test_common||test_grid||test_tree||test_treeTable
    }}
    refModelUrl = {{
        tableBodyUrl:`${GROBAL_HTTP_CTX}/common-ref/blobRefTreeGrid`,//表体请求
        refInfo:`${GROBAL_HTTP_CTX}/common-ref/refInfo`,//表头请求
    }}
    matchUrl={`${GROBAL_HTTP_CTX}/common-ref/matchPKRefJSON`}
    filterUrl={`${GROBAL_HTTP_CTX}/common-ref/filterRefJSON`}
    valueField="refpk"
    displayField="{refcode}"
    {...props}
    emptyBut
>
</RefMultipleTableWithInput>
```

3.树表参照
* 使用pap-common-treeTable提供的API进行调用
```javascript
import React, { Component } from 'react';
import  RefTreeTableWithInput  from 'pap-refer/lib/pap-common-treeTable/src/index';
import  'pap-refer/lib/pap-common-treeTable/src/index.css';
import { Button, Form, Panel } from 'tinper-bee';
class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
        value:''
        }
    
    }
render() {

const { getFieldProps, getFieldError } = this.props.form;
return (
        <div className="demo-label">
            <span >组织人员：</span>
            <RefTreeTableWithInput
                title = '组织部门人员'
                textOption= {{
                    menuTitle: '组织',
                  tableTitle: '人员',
                }}
                param = {{//url请求参数
                    refCode:'neworgdeptstaff_treegrid',
                }}
                multiple = {true}
                refModelUrl = {{
                    treeUrl: '/pap_basedoc/common-ref/blobRefTree',
                    refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
                    tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
                }}
                matchUrl= '/pap_basedoc/common-ref/matchPKRefJSON'
                filterUrl= '/pap_basedoc/common-ref/filterRefJSON'
                displayField='{refname}'
                valueField='refpk'
               lang={this.props.lang}
            theme={this.props.theme}
                {...getFieldProps('code', {
                    initialValue: '{"refname":"","refpk":""}',
                    rules: [{
                        message: '提示：请选择',
                        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                    }]
                })}
            />
            <span style={{
                color: 'red'
            }}>
                {
                    getFieldError('code')
                }
            </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo1);
```


4.树穿梭参照
* 使用pap-common-treeTransfer提供的API进行调用


```javascript
import React, { Component } from 'react';
import RefTreeTransferWithInput  from 'pap-refer/lib/pap-common-treeTransfer/src/index.js';
import "pap-refer/lib/pap-common-treeTransfer/src/index.css"
import { Button, Form, Panel } from 'tinper-bee';
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }

  }
  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    return (
        <div className="demo-label">
          <span >穿梭框：：</span>
          <RefTreeTransferWithInput
            title='组织部门人员穿梭'
            textOption={{
              leftTitle: '组织部门树',
              rightTitle: '人员穿梭框'
            }}
            param={{//url请求参数
              refCode: 'neworgdeptstaff_treegrid',
            }}
            refModelUrl={{
              treeUrl: '/pap_basedoc/common-ref/blobRefTree',
              tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',
              tableBodyUrlSearch: ''
            }}
            displayField='{refname}-{refcode}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            searchPlaceholder={'搜索'}
              notFoundContent={'暂无数据'}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            emptyBut={false}
          />
          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code')
            }
          </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo1);
```

5.下拉参照
* 使用pap-common-combobox提供的API进行调用

```javscript
import React, { Component } from 'react';
import RefComboBox,{ ComboStore } from 'pap-refer/lib/pap-common-combobox/src/index';
import 'pap-refer/lib/pap-common-combobox/src/index.css'
import { Button, Icon, Form } from 'tinper-bee';
class Demo1 extends Component {
  render() {

    const { getFieldError, getFieldProps } = this.props.form;
    return (
        <div className="demoPadding">
          <RefComboBox
            displayField={'{refname}-{refcode}'}
            valueField={'refcode'}
            onClickItem={(record) => {
              console.log(record)
            }}

            matchUrl='/pap_basedoc/common-ref/matchPKRefJSON'
            filterUrl='/pap_basedoc/common-ref/filterRefJSON'
            {...getFieldProps('combobox', {
              // initialValue:'{"refpk":"level1","refname":"初级"}',  //M0000000000002
              rules: [{
                message: '提示：请选择',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
          >
            <ComboStore
              ajax={{
                url: '/pap_basedoc/common-ref/blobRefTreeGrid',
                params: {
                  refCode: 'neworganizition_grid'
                },

              }}
              strictMode={true}
              displayField={(record) => {
                return <div > <Icon type="uf-personin-o" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>
              }}
             lang={this.props.lang}
            theme={this.props.theme}
            />
          </RefComboBox>
          <span style={{ color: 'red' }}>
            {getFieldError('combobox')}
          </span>
          <Button
            colors="primary"
            onClick={() => {
              this.props.form.validateFields((err, values) => {
                if(err){
                  alert(""+JSON.stringify(err));
                  return false;
                }
                alert(""+JSON.stringify(values))
              });
            }}>
            提交
          </Button>
        </div>
    )
  }
}


export default Form.createForm()(Demo1);

```

#### 3.3.4 开发应用平台3.5.6提供业务参照
应用平台提供参照：

* 组织部门（树形参照）
>* neworgdept_tree组织部门组合树

    * 支持单选、多选
    * 支持懒加载
    * 支持数据权限
    * 支持设置初始值及自定义icon
* 人员（表形参照）
>* new_bd_staff人员简单查询
>* new_bd_staff_multiple人员多字段查询

    * 支持单选、多选
    * 支持分页查询
    * 支持数据权限
    * 支持简单查询、复杂查询
* 用户（表形参照）
>* new_bd_user用户简单查询
    * 支持单选、多选
    * 支持分页查询
    * 支持数据权限
    * 支持简单查询
* 角色（表形参照）
>* newrole_grid角色简单查询

    * 支持单选、多选
    * 支持分页查询
    * 支持数据权限
    * 支持简单查询
* 岗位（表形参照）
>* newposition_grid岗位简单查询

    * 支持单选、多选
    * 支持分页查询
    * 支持数据权限
    * 支持简单查询
* 组织部门人员（树表、树穿梭参照）
>* neworgdeptstaff_treegrid

    * 支持单选、多选
    * 支持分页查询
    * 支持数据权限
    * 支持简单查询

> 1. 描述如何提供封装通用的业务参照

> 2. 描述应用平台前端封装的业务参照控件
import RefTreeWithInput from 'pap-refer/lib/pap-common-tree/src/index.js'

##### 3.3.3.1 使用应用平台提供参照：

| 参照名称 | 参照类型 | 控件 |
-|-|-
组织 | 树形参照 | PapReferOrg
部门 | 树形参照 | PapReferDept
部门 | 下拉参照 | 
组织部门 | 树形参照（组合树） | 
级联下部门参照 | 树形参照 | PapReferDeptUderOrg
用户 | 表格参照 | PapRefUser
人员 | 表格参照 | PapRefStaff
组织部门人员 | 穿梭框 | 
组织部门人员 | 树表 | 
角色 | 表格参照 | PapRefRole
岗位 | 表格参照 | PapRefPosition


> pap-ref-org

组织参照（树形参照）；在pap-common-tree的基础上封装的业务参照组件
>* 参照编码neworganizition_tree

    * 支持单选、多选
    * 支持懒加载
    * 支持数据权限
    * 支持设置初始值及自定义icon

* 如何使用
```javascript
import PapReferOrg from 'pap-refer/lib/pap-ref-org/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css'
<PapReferOrg
    multiple={false}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    nodeDisplay='{refname}'
    valueField='refpk'
    lang={this.props.lang}
    emptyBut={true}
    {...getFieldProps('code', {
        initialValue: '{"refname":"","refpk":""}',
        rules: [{
        message: '提示：请选择组织',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
        }]
    })}
    />         
```

* 内置参数

param，refModelUrl固定不可变
```javascript
const Locale = {
  'en_us':{
    '组织':'org'
  },
  'zh_tw':{
    '组织':'組織',
  },
  'zh_cn':{
    '组织':'组织',
  }
}
const requestParam = {
  param:{
    "refCode": "neworganizition_tree",

  },
  refModelUrl:{
    treeUrl: '/pap_basedoc/common-ref/blobRefTree',
  },
  matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
  filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}

```

> pap-ref-dept

部门参照（树形参照）；在pap-common-tree的基础上封装的业务参照组件
>* 参照编码newdept_tree部门参照
>* 参照编码newdeptUnderOrg_trees组织下部门参照单选（组织单选作为过滤条件）
>* 参照编码newdeptUnderOrg_treem组织下部门参照多选（组织多选作为过滤条件）

    * 支持单选、多选
    * 支持懒加载
    * 支持数据权限
    * 支持与组织级联过滤
    * 支持设置初始值及自定义icon

* 如何使用
```javascript
import PapReferDept from 'pap-refer/lib/pap-ref-dept/src/index.js';
import 'pap-refer/lib/pap-common-tree/src/index.css'
<PapReferDept
    multiple={false}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    valueField='refpk'
    lang={this.props.lang}
    emptyBut={true}
    {...getFieldProps('code1', {
    initialValue: '{"refname":"","refpk":""}',
    rules: [{
        message: '提示：请选择',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
    }]
    })}
/>            

```

* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中treeUrl固定，但是可以接受refModelUrl的其他参数
```javascript
const Locale = {
    'en_us':{
    '部门':'dept'
    },
    'zh_tw':{
    '部门':'部門',
    },
    'zh_cn':{
    '部门':'部门',
    }
}
let requestParam = {
    param:{
        "refCode": "newdeptUnderOrg_trees",
    },
    refModelUrl:{
    treeUrl: '/pap_basedoc/common-ref/blobRefTree',
    },
    matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}

```

> pap-ref-deptUnderOrg

级联下部门参照
在pap-common-tree的基础上封装的业务参照组件，在级联情况下使用

* 如何使用

```javascript
import PapReferDeptUnderOrg from 'pap-refer/lib/pap-ref-deptUnderOrg/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css'
<PapReferDeptUnderOrg
    multiple={true}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    valueField='refpk'
    param={{
        "refCode": "newdeptUnderOrg_trees",
        "clientParam":Object.keys(singleClientParam).length===0?'':singleClientParam
        
    }}
    lang={this.props.lang}
    {...getFieldProps('code1', {
        initialValue: '{"refname":"","refpk":""}',
        rules: [{
        message: '提示：请选择部门',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
        }]
    })}

    />

```
* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中treeUrl固定，但是可以接受refModelUrl的其他参数

```javascript
const Locale = {
    'en_us':{
    '部门':'dept'
    },
    'zh_tw':{
    '部门':'部門',
    },
    'zh_cn':{
    '部门':'部门',
    }
}
let requestParam = {
    param:{
        "refCode": "newdeptUnderOrg_treem",
    },
    refModelUrl:{
    treeUrl: '/pap_basedoc/common-ref/blobRefTree',
    },
    matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}

```

> pap-ref-user

用户参照
在pap-common-table的基础上封装的业务参照组件


* 如何使用

```javascript
import PapRefUser from 'pap-refer/lib/pap-ref-user/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css'
<PapRefUser
    multiple={false}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    valueField='refpk'
    lang={this.props.lang}
    {...getFieldProps('code', {
        initialValue: '{"refname":"","refpk":""}',
        rules: [{
        message: '提示：请选择',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
        }]
    })}
    emptyBut={true}

    />
```


* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中tableBodyUrl和refInfo固定，但是可以接受refModelUrl的其他参数
```javascript
const Locale = {
    'en_us': {
        '用户': 'user'
    },
    'zh_tw': {
        '用户': '用户',
    },
    'zh_cn': {
        '用户': '用户',
    }
}
let requestParam = {
    param: {
        "refCode": "new_bd_user"
    },
    refModelUrl: {
      tableBodyUrl: '/wbalone/common-ref/blobRefTreeGrid',//表体请求
      refInfo: '/wbalone/common-ref/refInfo',//表头请求
    },
    matchUrl:'/wbalone/common-ref/matchPKRefJSON',
    filterUrl:'/wbalone/common-ref/filterRefJSON'
}
```

> pap-ref-staff

人员参照
在pap-common-table的基础上封装的业务参照组件

* 如何使用

```javascript

import PapRefStaff from 'pap-refer/lib/pap-ref-staff/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css'
 <PapRefStaff
    multiple={true}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    valueField='refpk'
    lang={this.props.lang}
    emptyBut={true}

    {...getFieldProps('code1', {
        initialValue: '{"refname":"","refpk":""}',
        rules: [{
        message: '提示：请选择',
        pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
        }]
    })}
    />
```

* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中tableBodyUrl和refInfo固定，但是可以接受refModelUrl的其他参数
```javascript
const Locale = {
    'en_us': {
        '人员': 'staff'
    },
    'zh_tw': {
        '人员': '人員',
    },
    'zh_cn': {
        '人员': '人员',
    }
}
let requestParam = {
    param: {
        "refCode": "new_bd_staff"
    },
    refModelUrl: {
        tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
        refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
    },
    matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}

```

> pap-ref-role

角色参照
在pap-common-table的基础上封装的业务参照组件

* 如何使用

```javascript
import PapRefRole from 'pap-refer/lib/pap-ref-role/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css'
<PapRefRole
	multiple={false}
	searchable={true}
	checkStrictly={true}
	strictMode={true}
	displayField='{refname}'
	valueField='refpk'
	lang={this.props.lang}
	{...getFieldProps('code', {
		initialValue: '{"refname":"","refpk":""}',
		rules: [{
			message: '提示：请选择',
			pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
		}]
	})}
	emptyBut={true}
	searchPanelLocale={{'title': '条件筛选','resetName': '重置','searchName': '查询','down':'打开','up':'关闭',}}

/>

```


* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中tableBodyUrl和refInfo固定，但是可以接受refModelUrl的其他参数
```javascript
const Locale = {
    'en_us': {
        '角色': 'role'
    },
    'zh_tw': {
        '角色': '角色',
    },
    'zh_cn': {
        '角色': '角色',
    }
}
let requestParam = {
    param: {
        "refCode": "newrole_grid"
    },
    refModelUrl: {
        tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
        refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
    },
    matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}


```

> pap-ref-position

岗位参照
在pap-common-table的基础上封装的业务参照组件

* 如何使用

```javascript
import PapRefPosition from 'pap-refer/lib/pap-ref-position/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css'
<PapRefPosition 
    multiple={false}
    searchable={true}
    checkStrictly={true}
    strictMode={true}
    displayField='{refname}'
    valueField='refpk'
    lang={this.props.lang}
    emptyBut={true}

    {...getFieldProps('code1', {
        initialValue: '{"refname":"","refpk":""}',
        rules: [{
            message: '提示：请选择',
            pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
        }]
    })}
/>
```
* 内置参数

param中refcode是固定，但是可以接收param其他参数，refModelUrl中tableBodyUrl和refInfo固定，但是可以接受refModelUrl的其他参数
```javascript
const Locale = {
    'en_us':{
    '组织':'org'
    },
    'zh_tw':{
    '组织':'組織',
    },
    'zh_cn':{
    '组织':'组织',
    }
}
let requestParam = {
    param: {
            "refCode": "newposition_grid"
        },
    refModelUrl: {
            tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
            refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
        },
    matchUrl : '/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl : '/pap_basedoc/common-ref/filterRefJSON'
}

```

#### 3.3.5 参照开发问题记录
1. 数据权限：单实体，如物料基于多字段维度进行数据权限过滤【问题点在于是否支持多维度数据权限，多维度数据权限是关系是否在中间表上，如问题2】
2. 数据权限：如查询某个组织下的人员、用户数据权限【问题点在于人员、用户与组织的关联关系在中间表上】
表格多字段展现：
3. 单实体，如物料需要基于多个实体进行表格展现，如展现物料中组织的信息【展现信息是否包含当前实体以外的信息？是否跨服务？跨服务是否通用解决？】
4. 组合树表场景：==》需要多个fid的设置
* 4.1 树与表的关联关系保存在表中，如菜单管理中的功能参照，功能上存有应用与分组的关联关系；基础的表格配置结合fid即可；
* 4.2 树与表的关联关系保存在中间表中，如组织、部门、人员的关联关系
``select  id,code,name,email,mobile  from (
select a.*,b.DEPTID,b.ORGID from BD_STAFF a 
LEFT JOIN BD_MAIN_JOB b ON a.id=b.STAFFID 
)
where DEPTID='9711d912-3184-4063-90c5-1facc727813c' OR ORGID='9711d912-3184-4063-90c5-1facc727813c'``
* 4.3 组合树与表的关联关系分别保存在各自的中间表中，如组织与人员关联表、部门与人员关联表
``select  id,code,name,email,mobile  from (
	select a.*,b.DEPTID,c.ORGID from BD_STAFF a 
	LEFT JOIN BD_MAIN_JOB b ON a.id=b.STAFFID
	LEFT JOIN BD_STAFF_ORG c ON a.id=c.STAFFID
)
where DEPTID='9711d912-3184-4063-90c5-1facc727813c' or ORGID='a4cf0601-51e6-4012-9967-b7a64a4b2d47'``
* 4.4 组织、部门、用户==》跨服务的场景
* 4.5 组合树数据权限问题同上
5. 组合树层级目前支持两级，如需扩展层级问题？subTree增加层级标记扩展（与entityType建立关系）
6. **数据权限及编码映射适配react2.0版新参照**

7. 数据权限支持单实体数据权限
8. 参照不支持引用展示
9. **参照默认实现考虑数据权限扩展**

10. nc、营销云、ucf如何集成

11. 参照提供的数据权限服务方法支持树表等其他场景验证

**TODO**
1. 前端设置操作符过滤
2. ~~多语验证~~
3. pap-common-combobox前台实现对接表格后台
4. 快捷录入

### 3.3.6 参照开发bugfix记录
> ~~eg.参照级联需要提供回调函数onClickGoOn、和 onHandleGoOn~~ 2019.02.16 姚鑫
1. 级联下filter match的请求参数没有带上clientParam
2. 表格级联
3. 参照支持1024分辨率
4. 参照树是否支持缓渲染




## 第四章 开发示例
### 4.1 开发流程
#### 4.1.1 后端开发流程
* 后端项目需要在pom文件中添加依赖
>>
    <dependency>
        <groupId>com.yonyou.iuap.pap.base</groupId>
        <artifactId>pap_base_comp_ref</artifactId>
        <version>3.5.6-RELEASE</version>
    </dependency>

* 需要在resources目录下定义一个ref.xml文件，这里以组织树形参照为例，其他类型的参照，请参考第三章详细介绍；根据需求在ref.xml中定义RefViewModelVO结构描述参照；
>>
    <?xml version="1.0" encoding="utf-8"?>
    <root>
        <RefViewModelVO code="neworganizition_tree" name="组织-平台树" i18nkey="ja.ref.org.0004" type="1"  >
            <thead>
                <field code="code" i18nkey="ja.ref.org.0002">组织编码</field>
                <field code="name" i18nkey="ja.ref.org.0003" i18n="true">组织名称</field>
            </thead>
            <tableTree name="ORG_ORGANIZATION">
                <field code="id">ID</field>
                <field code="refpk">ID</field>
                <field code="refcode">code</field>
                <field code="refname">name</field>
                <field code="pid">PARENT_ID</field>
                <field code="extension">code</field>
                <field code="extension">name</field>
                <field code="tenant">TENANT_ID</field>
                <field code="sysId">SYS_ID</field>
                <field code="dataPermission">organization</field>
            </tableTree>
        </RefViewModelVO>
    </root>

* 在参照模型表中REF_REFINFO，进行参照模型注册
    * 其中refurl的值为ctx+/common-ref/
    * 并且refversion需要设置为2.0_common
    * refcode需要与ref.xml中保证一致
> INSERT INTO REF_REFINFO (PK_REF, REFNAME, REFCODE, REFCLASS, REFURL, MD_ENTITYPK, PRODUCTTYPE, TENANTID, REFVERSION, REFNAME2, REFNAME3, REFNAME4, REFNAME5, REFNAME6) 
VALUES ('neworganizition_tree', '组织-平台树', 'neworganizition_tree', NULL, '/pap_basedoc/common-ref/', NULL, NULL, NULL, '2.0_common', 'neworganizition_tree', '组织-平台树', NULL, NULL, NULL);

* 提供了工具方法进行参照的id转换name的方法，以满足在数据查询时候，参照pk与name转换显示的场景
    * 参数Map<String,List<String>>的key是refcode，value是ids的数组
    * 返回值Map<String,List<Map<String, Object>>>的key是refcode，value是map返回值的list数组
> Map<String,List<Map<String, Object>>> com.yonyou.iuap.pap.base.ref.utils.RefIdToNameUtil#convertIdToName(Map<String,List<String>>) 

* 需要在application.properties中配置

    workbench.newref.url需要配置为环境中newref服务地址，形如:
    workbench.newref.url=http://172.20.52.123:80
    
    buzi.ids.url需要配置为环境中业务服务参照地址信息，形如：
    buzi.ids.url=http://172.20.52.123:80

#### 4.1.2 基于baseservice开发功能节点（可以参考示例节点-A2单表行内编辑示例）
* baseservice提供了业务开发得开发框架，在进行业务单据参照开发得场景下，上述《4.1.1 后端开发流程》也是需要操作的；
* 后端项目需要在pom文件中添加依赖
>>
    <dependency>
        <groupId>com.yonyou.iuap.baseservice</groupId>
        <artifactId>iuap-pap-baseservice-statistics</artifactId>
        <version>3.5.6-RELEASE</version>
    </dependency>

* 实体需要设置Reference注解
>>
    @Column(name = "ORG")
    @Reference(code = "neworganizition_tree", srcProperties = { "refname" }, desProperties = { "orgName" })
	private String org; // 所属组织

	@Transient
	private String orgName; // 组织名称

    public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgName() {
		return this.orgName;
	}

@Reference(code = "neworganizition_tree", srcProperties = { "refname" }, desProperties = { "orgName" })这里code对应ref.xml中code或者ref_refinfo表中得refcode；这里srcProperties对应显示值为table下name字段对应的值或者该参照在ref.xml中配置得值，即组织名称refname；desProperties是用于回显查找展示的参照name字段的值数据，此数据不入库。如orgName；参照显示字段为非持久化字段，所以需要添加@Transient注解


* service需要继承GenericIntegrateService，并设置特性UNI_REFERENCE完成selectAllByPage中参照id和name得转换
>>
    @Override
	protected ServiceFeature[] getFeats() {
		return new ServiceFeature[] { xxx,UNI_REFERENCE };
	}
    

#### 4.1.3 前端开发流程
* npm需要依赖的组件
>
    "pap-refer": "3.5.6",

* 使用pap-common-tree提供的API进行调用
```javascript
import RefTreeWithInput from'pap-refer/lib/pap-common-tree/src/index.js'; 
import "pap-refer/lib/pap-common-tree/src/index.css";
    
    <div className="demo-label">
        <span >单选（组织）：</span>
        <RefTreeWithInput
            title={'组织'}

            param={{
                "refCode": "neworganizition_tree"
            }}
            refModelUrl={{
                treeUrl: '/pap_basedoc/common-ref/blobRefTree',
            }}
            matchUrl='/pap_basedoc/common-ref/matchPKRefJSON'
            filterUrl='/pap_basedoc/common-ref/filterRefJSON'
            multiple={false}
            searchable={true}
            checkStrictly= {true}
            strictMode = {true}
            displayField='{code}' nodeDisplay='{code}'
            valueField='refpk'

            {...getFieldProps('code', {
                initialValue: '{"refname":"","refpk":""}',
                rules: [{
                    message: '提示：请选择组织',
                    pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                }]
            })}
        />
        <span style={{
            color: 'red'
        }}>
            {
                getFieldError('code')
            }
        </span>
    </div>
```

##### 4.1.3.1 使用应用平台提供参照：
这里以应用平台提供的组织参照为例
> pap-ref-org

组织参照
在pap-common-tree的基础上封装的业务参照组件

* 如何使用
```javascript
import PapReferOrg from 'pap-refer/lib/pap-ref-org';
<PapReferOrg
            multiple={false}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            nodeDisplay='{refname}'
            valueField='refpk'
            lang={this.props.lang}
            emptyBut={true}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择组织',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
          />         
```

###### 内置参数
param，refModelUrl固定不可变
```javascript
    const Locale = {
  'en_us':{
    '组织':'org'
  },
  'zh_tw':{
    '组织':'組織',
  },
  'zh_cn':{
    '组织':'组织',
  }
}
const requestParam = {
  param:{
    "refCode": "neworganizition_tree",

  },
  refModelUrl:{
    treeUrl: '/pap_basedoc/common-ref/blobRefTree',
  },
  matchUrl:'/pap_basedoc/common-ref/matchPKRefJSON',
  filterUrl:'/pap_basedoc/common-ref/filterRefJSON'
}

```


### 4.2 示例地址

>1. 访问环境进行登陆 
>   http://refdemo.app.yyuap.com/wbalone/
>   用户名admin   密码123qwe
>2. 访问参照示例地址
>   http://refdemo.app.yyuap.com/dist/ucf-publish/iuap-pap-demo-fe/ref-demo/index.html

![image](https://user-images.githubusercontent.com/33412781/60429765-60532080-9c2e-11e9-80bc-5bcfd51e2135.png)

![image](https://user-images.githubusercontent.com/33412781/60429776-6b0db580-9c2e-11e9-823b-dfe2e3d61e59.png)

![image](https://user-images.githubusercontent.com/33412781/60429789-752fb400-9c2e-11e9-945b-5e87d60daa15.png)

### 4.3 示例项目
* 前端项目 iuap-pap-demo-fe 负责人：姚鑫
* 后端项目 pap_basedoc 负责人：范传军

### 4.4 示例内容
* 单选、多选
* 懒加载、分页
* 树、表、组合树、复杂查询表格、穿梭框
* 参照级联（事件、参考邮件中3个场景）
* 数据权限
* IdToName




## 第五章 典型业务场景介绍
### 5.1 参照选择值将多余信息带入输入框

<img src="https://user-images.githubusercontent.com/33412781/60429836-84aefd00-9c2e-11e9-95b7-e302d6bf41e8.png" width="400" align=center />

```javascript
import React, { Component } from 'react';
import PapRefStaff from 'pap-refer/lib/pap-ref-staff/src/index';
import 'pap-refer/lib/pap-common-table/src/index.css';
import { Button, Form, FormControl } from 'tinper-bee';
class Demo3 extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      name: '',
      email: '',
      mobile: ''
    }

  }
  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    const { style } = this.props;
    let {
      name,
      email,
      mobile,
    } = this.state;
    return (
        <div className="demo-label">
          <span >人员参照：</span>
          <PapRefStaff
            multiple={false}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            emptyBut={true}
            searchPanelLocale={{'title': '条件筛选','resetName': '重置','searchName': '查询','down':'打开','up':'关闭',}}

            {...getFieldProps('code1', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            onSave={(record) => {
              console.log(record)
              let item = record[0]
              if (!item) return;
              this.setState({
                name: item.name,
                email: item.email,
                mobile: item.mobile
              })
            }}
          />

          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code1')
            }
          </span>
        </div>
        <div className="demo-label">
          <span >人员名称：</span>
          <FormControl
            style={{
              width: 200
            }}
            value={name}
          />
        </div>
        <div className="demo-label">
          <span >人员邮箱：</span>
          <FormControl
            style={{
              width: 200
            }}
            value={email}
          />
        </div>
        <div className="demo-label">
          <span >人员电话：</span>
          <FormControl
            style={{
              width: 200
            }}
            value={mobile}
          />
        </div>
    )
  }
};

export default Form.createForm()(Demo3);
```
### 5.2 参照级联
> refcorewithinput中添加拦截操作，新增两个回调函数onClickGoOn、和 onHandleGoOn，示例中验证

<img src="https://user-images.githubusercontent.com/33412781/60429856-90022880-9c2e-11e9-84ad-c435e33fdcde.png" width="1000" align=center />

#### 5.2.1 参照级联单选
> 前端部分：关键在参数param中clientParam字段
```javascript

import React, { Component } from 'react';
import PapReferOrg from 'pap-refer/lib/pap-ref-org/src/index';
import PapReferDeptUnderOrg from 'pap-refer/lib/pap-ref-deptUnderOrg/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css';
import {Button,Form} from 'tinper-bee';
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      singleClientParam:{},
    }

  }
  
  singleSaveOrgParam = (result) =>{
    //组织单选的保存，级联参照
    this.setState({
        singleClientParam:result.length === 0?{}:{'organization_id':result[0].refpk},
    })
    
  }
  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    let {singleClientParam} = this.state;
    const clientParam = {"isUseDataPower":"true"};
    singleClientParam = Object.assign({},clientParam,singleClientParam)
    return (
        <div className="demo-label">
          <span >单选（组织）：</span>
          <PapReferOrg
            multiple={false}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择组织',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            onSave={this.singleSaveOrgParam}
          />
          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code')
            }
          </span>
        </div>
        <div className="demo-label">
          <span >级联（部门）：</span>
          <PapReferDeptUnderOrg
            multiple={true}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
            param={{
                "refCode": "newdeptUnderOrg_trees",
                "clientParam":Object.keys(singleClientParam).length===0?'':singleClientParam
                
            }}
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code1', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择部门',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}

          />

          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code1')
            }
          </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo1);
```
>后端部分：关键将前一个参照的值作为过滤条件，使用filter作为条件
```
<RefViewModelVO code="newdeptUnderOrg_trees" name="部门-平台树" i18nkey="ja.ref.dept.0004" type="1" >
  <thead>
    <field code="code" i18nkey="ja.ref.dept.0002">部门编码</field>
    <field code="name" i18nkey="ja.ref.dept.0003" i18n="true">部门名称</field>
  </thead>
  <tableTree name="ORG_DEPARTMENT">
    <field code="id">ID</field>
    <field code="refpk">ID</field>
    <field code="refcode">code</field>
    <field code="refname">name</field>
    <field code="pid">PARENT_ID</field>
    <field code="extension">code</field>
    <field code="extension">name</field>
    <field code="tenant">TENANT_ID</field>
    <field code="sysId">SYS_ID</field>
    <field code="dataPermission">deptRef</field>
    <!-- filter组织级联部门参照单选组织过滤 -->
    <filters>
      <filter code="organization_id" value="=" />
    </filters>
  </tableTree>
</RefViewModelVO>
```

#### 5.2.2 参照级联多选
> 前端部分：关键在参数param中clientParam字段

```javascript
import React, { Component } from 'react';
import PapReferOrg from 'pap-refer/lib/pap-ref-org/src/index';
import PapReferDeptUnderOrg from 'pap-refer/lib/pap-ref-deptUnderOrg/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css';
import {Button,Form} from 'tinper-bee';
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      multiClientParam: {},
    }

  }

  multiSave = (result) => {
    let arr = [];
    result.forEach(item => {
      item && arr.push(item.refpk);
    })
    this.setState({
      multiClientParam: arr.length === 0 ? {} : { 'organization_id': arr.toString() }
    })

  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    let { multiClientParam } = this.state;
    const clientParam = { "isUseDataPower": "true" };
    multiClientParam = Object.assign({}, clientParam, multiClientParam)
    return (
        <div className="demo-label">
          <span >多选（组织）：</span>
          <PapReferOrg
            multiple={true}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择组织',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            onSave={this.multiSave}
          />
          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code')
            }
          </span>
        </div>
        <div className="demo-label">
          <span >级联（部门）：</span>
          <PapReferDeptUnderOrg
            multiple={true}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
            param={{
              "refCode": "newdeptUnderOrg_treem",
              "clientParam": Object.keys(multiClientParam).length === 0 ? '' : multiClientParam
            }}
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code1', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择部门',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}

          />

          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code1')
            }
          </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo1);
```

>后端部分：关键将前一个参照的值作为过滤条件，使用filter作为条件，与上例不同之处在于支持多个条件

```
<!-- filter组织级联部门参照多选组织过滤 -->
<filters>
  <filter code="organization_id" value="in" />
</filters>
```


#### 5.2.3 参照级联不选有提示

```javascript
import React, { Component } from 'react';
import PapReferOrg from 'pap-refer/lib/pap-ref-org/src/index';
import PapReferDeptUnderOrg from 'pap-refer/lib/pap-ref-deptUnderOrg/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css';
import { Button, Form } from 'tinper-bee';
import Message from 'bee-message';
import 'bee-message/build/Message.css';
class Demo3 extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      sum: 1,
      singleClientParam: {},
      messageShow: false,
      jiLianValue: {
        refname: "",
        refpk: "",
      },
    }

  }

  singleSaveOrgParam = (result) => {
    //组织单选的保存，级联参照
    this.props.form.setFieldsValue({code1:{'refname':'',refpk:''}})
    this.setState({
      singleClientParam: result.length === 0 ? {} : { 'organization_id': result[0].refpk },
    });

  }
  danger = () =>{
    Message.destroy();
    Message.create({ content: '请先选择组织', color: 'danger',position:'topRight'});
    
  }
  canGetData = () => {
    if (Object.keys(this.state.singleClientParam).length === 0) {
      this.danger();
     return false;
    }
    return true;
  }
  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    let { singleClientParam, jiLianValue } = this.state;
    const clientParam = { "isUseDataPower": "true" };
    singleClientParam = Object.assign({}, clientParam, singleClientParam)
    return (
        <div className="demo-label">
          <span >单选（组织）：</span>
          <PapReferOrg
            multiple={false}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择组织',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            onSave={this.singleSaveOrgParam}
          />
          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code')
            }
          </span>
        </div>
        <div className="demo-label">
          <span >级联（部门）：</span>
          <PapReferDeptUnderOrg
            multiple={true}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
            param={{
              "refCode": "newdeptUnderOrg_trees",
              "clientParam": Object.keys(singleClientParam).length === 0 ? '' : singleClientParam

            }}
           lang={this.props.lang}
            theme={this.props.theme}
            {...getFieldProps('code1', {
              initialValue: JSON.stringify(jiLianValue),
              rules: [{
                message: '提示：请选择部门',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
            canInputGoOn={this.canGetData}
            canClickGoOn={this.canGetData}
            // value={JSON.stringify(jiLianValue)}
          />

          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code1')
            }
          </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo3);
```
### 5.3 懒加载
> 树组件懒加载lazyModal=true，onLoadData函数不为空

```javascript

import React, { Component } from 'react';
import PapReferOrg from 'pap-refer/lib/pap-ref-org/src/index';
import 'pap-refer/lib/pap-common-tree/src/index.css';
import { Button, Form } from 'tinper-bee';
class Demo2 extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }

  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
        <div className="demo-label">
          <span >组织：</span>
          <PapReferOrg
            multiple={false}
            searchable={true}
            checkStrictly={true}
            strictMode={true}
            displayField='{refname}'
            valueField='refpk'
           lang={this.props.lang}
            theme={this.props.theme}
            lazyModal={true}
            emptyBut={true}
            {...getFieldProps('code', {
              initialValue: '{"refname":"","refpk":""}',
              rules: [{
                message: '提示：请选择组织',
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }]
            })}
          />

          <span style={{
            color: 'red'
          }}>
            {
              getFieldError('code')
            }
          </span>
        </div>
    )
  }
};

export default Form.createForm()(Demo2);

```
### 5.4 数据权限

暂无

### 5.5 多语

暂无



## 第六章 开放接口规范
### 6.1 后端接口说明
#### 6.1.1 请求参数说明
请求参数就是RefViewModelVO这个vo里的成员变量

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- 
| refUIType | RefUITypeEnum(枚举） | 否 | 参照类型（CommonRef,RefGrid，RefGridTree，RefTree,Custom） |
| defaultFieldCount | int | 否 | 默认显示字段中的显示字段数----表示显示前几个字段  |
| strFieldCode | String[] | 否 | 业务表的字段编码 |
| strFieldName | String[] | 否 | 业务表的字段中文名  |
| strHiddenFieldCode | String[] | 否 | 隐藏的字段  |
| refCodeNamePK | String[] | 否 | 参照编码&#124;名称&#124;主键  |
| isUseDataPower | boolean | 否 | 是否使用数据权限，默认为true |
| isMultiSelectedEnabled | boolean | 否 | 参照是否多选，默认为false |
| isNotLeafSelected | boolean | 否 | 非叶子节点是否可选，默认为true  |
| isCheckListEnabled | boolean | 否 | 焦点进入是否显示搜索的数据，默认不显示（false） |
| rootName | String | 否 | 树的根节点  |
| dataPowerOperation\_Code | String | 否 | 权限动作编码 |
| isReturnCode | boolean | 否 | input框显示编码还是显示名称        ，默认为false |
| pk\_group | String | 否 | 集团 |
| pk\_org | String | 否 | 组织 |
| pk\_user | String | 否 | 用户 |
| isMatchPkWithWherePart | boolean | 否 | 参照setpk匹配数据时，是否包含参照WherePart的开关，默认为true |
| pk\_val | String[] | 否 | 主键数组 |
| isClassDoc | String[] | 否 | 是否为档案类型，默认为false |
| filterPks | String[] | 否 | 按给定的Pks进行过滤 |
| refCode | String | 是 | 参照码，用来查询refUrl |
| callback | String | 是 | Jsonp跨域请求参数 |
| clientParam | String | 否 | 联动参数  |
| cfgParam | String | 否 | 配置参数 |
| content | String | 否 | 用于模糊查询匹配 |
| refModelUrl | String | 否 | 参照模板url |
| condition | String | 否 | 判断条件参数 |
| treeloadData | String | 否 | 默认为false，设置树是否为懒加载 |
| sysId | String | 否 | 系统id |
| tenantId | String | 否 | 租户id |
| refModelClassName | String | 否 | 自定义参照模型类  |
| refModelHandlerClass | String | 否 | 参照后端业务切入处理类 |
| pks | String | 否 | 数据的pk  |
| refName | String | 否 | 参照名称 |
| isTreeAsync | boolean | 否 | 同步加载树，默认false |
| refClientPageInfo | RefClientPageInfo | 否 | 分页信息类 |
| transmitParam | String | 否 | 每一列显示几条数据 |
| refVertion | RefVertion(枚举） | 否 | 参照类型（NewRef,OldRef） |

#### 6.1.2 RESTful接口
##### 6.1.2.1 /common-ref/refInfo
获取参照数据头接口

* 请求体

| URl | /ctx/common-ref/refInfo |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |

* 返回值：
>> 
    {
        "refUIType": "RefMultipleSelection",
        "refCode": "new_bd_user",
        "defaultFieldCount": 4,
        "strFieldCode": [
            "login_name",
            "name",
            "email",
            "phone"
        ],
        "strFieldName": [
            "用户编码",
            "用户名称",
            "用户邮箱",
            "用户电话"
        ],
        "rootName": "用户-平台表",
        "refName": "用户-平台表",
        "refClientPageInfo": {
            "pageSize": 100,
            "currPageIndex": 0,
            "pageCount": 0,
            "totalElements": 0
        },
        "refVertion": "NewRef"
    }

* 参数说明：

        "refUIType"表示参照类型
        "refVertion": "NewRef"表示新参照
        "refCode"表示当前得参照编码
        "defaultFieldCount"表示显示得列数
        "strFieldCode"表示显示列
        "strFieldName"表示显示列名
        "refName"表示参照名称以及"rootName"表示参照得根名称
        "refClientPageInfo"表示的是参照得分页信息

##### 6.1.2.2 /common-ref/blobRefTreeGrid
获取表格数据接口

* 请求体

| URl | /ctx/common-ref/blobRefTreeGrid |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| condition | String | 否 | 树的节点id，用于查询树表、树穿梭的表数据;如果树是单树则直接传递树节点id形如"35ba77fa-96ed-4dbf-8dc7-f0bf52452ca5"，如果是组合树，则形如{"refpk":"35ba77fa-96ed-4dbf-8dc7-f0bf52452ca5","entityType":"mainEntity"}其中entityType值分为主实体mainEntity、子实体subEntity |
| clientParam: {"isUseDataPower":"true"} | String | 否 | 设置是否启用数据权限 |
| content | String | 否 | 查询字段，如果有值，根据其值进行查询 |
| refClientPageInfo.currPageIndex | String | 是 | 分页当前页 |
| refClientPageInfo.pageSize | String | 否 | 分页总页数 |


* 返回值
>>
    {
        "status": 1,
        "data": [
            {
                "login_name": "bpm01",
                "phone": "18777777777",
                "name": "bpm01",
                "refpk": "e264e00bbb1b4e438f501d56de654ab9",
                "id": "e264e00bbb1b4e438f501d56de654ab9",
                "refcode": "bpm01",
                "refname": "bpm01",
                "email": "bpm@qq.com"
            },
            {
                "login_name": "admin",
                "phone": "13344445555",
                "name": "系统管理员",
                "refpk": "U001",
                "id": "U001",
                "refcode": "admin",
                "refname": "系统管理员",
                "email": "222@yonyou.com"
            }
        ],
        "page": {
            "pageSize": 10,
            "currPageIndex": 0,
            "pageCount": 3,
            "totalElements": 30
        },
        "allpks": null
    }

##### 6.1.2.3 /common-ref/blobRefTree
获取树数据接口

* 请求体

| URl | /ctx/common-ref/blobRefTree |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| treeNode | String | 是 | 表示上级 |
| treeloadData | String | 否 | 默认为false，设置树是否为懒加载 |
| sysId | String | 否 | 系统id |
| content | String | 否 | 查询字段，如果有值，根据其值进行查询 |
| condition | String | 否 | 可以传递一些判断条件 |

* 返回值：
>>
    {
        "status": 1,
        "data": [
            {
                "code": "org1",
                "children": [
                    {
                        "code": "bj",
                        "name": "北京总部",
                        "pid": "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        "refpk": "28233ab5-2141-4c47-80f7-6184f5eea645",
                        "id": "28233ab5-2141-4c47-80f7-6184f5eea645",
                        "refcode": "bj",
                        "refname": "北京总部"
                    }
                ],
                "name": "用友集团",
                "pid": null,
                "refpk": "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                "id": "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                "refcode": "org1",
                "refname": "用友集团"
            }
        ],
        "page": {
            "pageSize": 100,
            "currPageIndex": 0,
            "pageCount": 0,
            "totalElements": 0
        },
        "allpks": null
    }


* 参数说明：

        status:1表示成功，0表示失败
        data：参照树数据
            children:子节点(叶子节点没有该字段)
            pid:父节点的id
            id：该节点的id
            refcode：节点编码
            refpk:当前树节点的唯一标识
            refname：节点名称
        page: 分页信息
            pageSize：每页数据数量
            currPageIndex：当前页
            pageCount：总页数
            totalElements: 总记录数


##### 6.1.2.4 /common-ref/filterRefJSON
参照输入框内下拉框模糊匹配

* 请求体

| URl | /ctx/common-ref/filterRefJSON |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| callback | String | 是 | Jsonp跨域请求参数 |
| pk\_val | String | 否 | 匹配的id |

* 返回值：

{

&quot;data&quot;:[{&quot;refcode&quot;:&quot;001&quot;,&quot;refpk&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;id&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;refname&quot;:&quot;用友1&quot;}],

&quot;page&quot;:{&quot;pageSize&quot;:50,&quot;currPageIndex&quot;:0,&quot;pageCount&quot;:0},

&quot;allpks&quot;:null

}

* 参数说明：

data:返回的数据

refpk:当前数据的唯一标识

id:当前数据的id（属性）

refcode：参照数据编码

refname：参照数据的名称

page：分页信息

pageSize：每页数据数量

currPageIndex：当前页

pageCount：总页数

##### 6.1.2.5 /common-ref/matchPKRefJSON
通过pk查询所有数据,String pk数组入参

* 请求体

| URl | /ctx/common-ref/matchPKRefJSON |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| callback | String | 是 | Jsonp跨域请求参数 |
| content | String | 是 | 输入的内容 |


* 返回值：

{

&quot;data&quot;:[{&quot;refcode&quot;:&quot;001&quot;,&quot;refpk&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;id&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;refname&quot;:&quot;用友1&quot;}],

&quot;page&quot;:{&quot;pageSize&quot;:50,&quot;currPageIndex&quot;:0,&quot;pageCount&quot;:0},

&quot;allpks&quot;:null

}

* 参数说明：

data:返回的数据

refpk:当前数据的唯一标识

id:当前数据的id（属性）

refcode：参照数据编码

refname：参照数据的名称

page：分页信息

pageSize：每页数据数量

currPageIndex：当前页

pageCount：总页数

##### 6.1.2.6 /common-ref/getByIds
为数据权限提供使用

* 请求体

| URl | /ctx/common-ref/getByIds |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| callback | String | 是 | Jsonp跨域请求参数 |
| content | String | 是 | 输入的内容 |

* 返回值：

{

&quot;data&quot;:[{&quot;refcode&quot;:&quot;001&quot;,&quot;refpk&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;id&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;refname&quot;:&quot;用友1&quot;}],

&quot;page&quot;:{&quot;pageSize&quot;:50,&quot;currPageIndex&quot;:0,&quot;pageCount&quot;:0},

&quot;allpks&quot;:null

}

* 参数说明：

data:返回的数据

refpk:当前数据的唯一标识

id:当前数据的id（属性）

refcode：参照数据编码

refname：参照数据的名称

page：分页信息

pageSize：每页数据数量

currPageIndex：当前页

pageCount：总页数

##### 6.1.2.7 /common-ref/search
为数据权限提供使用得搜索方法

* 请求体

| URl | /ctx/common-ref/search |
| --- | --- |
| Method | GET |

* 常用请求参数：

| 参数 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| refCode | String | 是 | 参照码，用来查询refUrl |
| callback | String | 是 | Jsonp跨域请求参数 |
| content | String | 是 | 输入的内容 |

* 返回值：

{

&quot;data&quot;:[{&quot;refcode&quot;:&quot;001&quot;,&quot;refpk&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;id&quot;:&quot;8f503c57-7532-47b4-b038-955866e151be&quot;,&quot;refname&quot;:&quot;用友1&quot;}],

&quot;page&quot;:{&quot;pageSize&quot;:50,&quot;currPageIndex&quot;:0,&quot;pageCount&quot;:0},

&quot;allpks&quot;:null

}

* 参数说明：

data:返回的数据

refpk:当前数据的唯一标识

id:当前数据的id（属性）

refcode：参照数据编码

refname：参照数据的名称

page：分页信息

pageSize：每页数据数量

currPageIndex：当前页

pageCount：总页数

#### 6.1.3 接口说明

| 参照类型 | 服务接口 | 是否必须 |
| --- | --- | --- 
| 树参照   | /common-ref/refInfo | 是 | 
|         | /common-ref/blobRefTree | 是 | 
|         | /common-ref/filterRefJSON | 是 | 
|         | /common-ref/matchPKRefJSON | 是 | 
|         | /common-ref/getByIds | 否 | 
|         | /common-ref/search | 否 | 
| 表格参照 | /common-ref/refInfo | 是 | 
|         | /common-ref/blobRefTreeGrid | 是 | 
|         | /common-ref/filterRefJSON | 是 | 
|         | /common-ref/matchPKRefJSON | 是 | 
|         | /common-ref/getByIds | 否 | 
|         | /common-ref/search | 否 | 
| 树表参照 | /common-ref/refInfo | 是 | 
|         | /common-ref/blobRefTree | 是 | 
|         | /common-ref/blobRefTreeGrid | 是 | 
|         | /common-ref/filterRefJSON | 是 | 
|         | /common-ref/matchPKRefJSON | 是 | 
|         | /common-ref/getByIds | 否 | 
|         | /common-ref/search | 否 |  
|穿梭框参照| /common-ref/refInfo | 是 | 
|         | /common-ref/blobRefTree | 是 | 
|         | /common-ref/blobRefTreeGrid | 是 | 
|         | /common-ref/filterRefJSON | 是 | 
|         | /common-ref/matchPKRefJSON | 是 | 
|         | /common-ref/getByIds | 否 | 
|         | /common-ref/search | 否 | 

### 6.2 前端接口说明

#### 6.2.1 pap-common-tree 树形参照

##### 6.2.1.1 树形参照分类为下列四种

* RefTree
    
    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。

* RefTreeWithInput
    
    带文本框的参照弹出窗。在 RefTree 基础上封装实现。

* createRefTree
    
    非 ReactJS 调用方式，与 RefTree 相同没有输入框，使用时可根据自己需要定义具体的文本框。

* createRefTreeWithInput
    
    非 ReactJS 调用方式，与 RefTreeWithInput 相同，带文本框的参照弹出窗。
    
##### 6.2.1.2 API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。'ref-walsin-modal'参照使用另外一种风格 | 否
<span style="color:red;">*</span> strictMode|`bool`|false |严格模式，此配置项为业务优化使用，当为 true（启用） 时每次打开弹出层都会刷新数据，若不启用时第一次数据加载正常且部为第一页数据时不再刷新数据 | 否
multiple |`bool`| false |是否单选， true 多选，false 单选， 同时多选时不会有确认和取消按钮，多选时会出现复选框 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
nodeDisplay |<code>string 或 function</code>| `{refname}` |节点渲染时可匹配的内容，这里为了提供根据数据渲染节点图标使用 | 否
lazyModal |`bool`| false |数据懒加载模式，true 启用，false 不启用 | 否
param|`object`| {} |refModelUrl 中接口请求的参数 | 否
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开 | 否
checkStrictly |`bool`|false|checkable状态下节点选择完全受控（父子节点选中状态不再关联）, false 关联选择，true 不关联| 否
refModelUrl |`object`|{treeUrl:''} |弹出层数据接口地址，为了兼容其他参照保留了多连接配置。| 是
matchUrl| ``string``|空|查询并校验 value 中的 refpk 对应参照的详细记录并且修改checkedArray。 当需要请求接口获取完整数据时，可以传入checkedArray=[]，value中refpk不为空就可以|否
checkedArray| `array`|[]|已选择数据。注意，当使用RefTreeWithInput 或者 搭配refcorewithinput使用时，checkedArray这个参数不起效且初始值默认[] | 否
filterUrl| ``string``|空|快捷录入接口。|否
nodeDisplay |<code>string 或 function</code>|'{refname}' |指定树节点渲染内容。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons|`object`| - |{buttons:{cancelText:'',confirmText:'',okText:''}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel|`function()`|-- |关闭弹出层 | 否
jsonp| `bool` | false | treeUrl和matchUrl的request请求传参jsonp| 否
headers| -- | -- | matchUrl的request请求传参headers| 否
onMatchInitValue| `function(data)` | -- | 返回matchUrl请求的全部数据|否
onAfterAjax| `function(data)`| -- |treeUrl请求后的回调，返回全部数据| 否
checkAllchildren| `bool` | -- |选中子节点|否
showLine| `bool` | false|tree组件连线 |否
theme| `String` | 'ref-red' | 启用参照默认样式，theme=''关闭参照默认样式| 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否
<s>bottomButton</s>| `bool` | true| 无使用|否
<s>checkable</s>| `bool` | true|无使用 |否
<s>tabData</s>| `array`| [] | json数组须指定 title,id 参数   默认为空,且为空时不显示 tab 组件。无使用| 否 
<s>parentNodeDisableCheck</s> | `bool` | false|无使用 |否
<s>lazyParam</s>|`array`|[]|20190127懒加载需要多传参数，暂时不对外暴露| 否



##### 6.2.1.3 RefTreeWithInput 增量 API

<span style="color: red; font-size: 15px;">注意:以下参数为 `<RefTreeTableWithInput/>`独有。对其他两个类型的引用无效。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

##### 6.2.1.4 参数详解

```js
eg:
    refModelUrl:{
        // treeUrl 为 ref-tree 的数据来源。
        treeUrl: 'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch'
    }
    lang:
      "zh_CN" // 中文
      "en_US" // 英文
      "zh_TW" // 繁体中文
      "fr_FR" // 法文
      "de_DE" // 德文
      "ja_JP" // 日文
```

#### 6.2.2 pap-common-table 表格参照

##### 6.2.2.1 表格参照分类为下列四种

* RefMultipleTable
    
      参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。

* RefMultipleTableWithInput
    
    带文本框的参照弹出窗。在 RefMultipleTable 基础上封装实现。

* createRefMultipleTableModal
    
    非 ReactJS 调用方式，与 RefMultipleTable 相同没有输入框，使用时可根据自己需要定义具体的文本框。

* createRefMultipleTable
   
    非ReactJS调用方式，与RefMultipleTableWithInput相同

##### 6.2.2.2 API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层的样式，默认为空。 | 否
<span style="color:red;">*</span> strictMode|`bool`|false |严格模式，此配置项为业务优化使用，当为 true（启用） 时每次打开弹出层都会刷新数据，若不启用时第一次数据加载正常且部为第一页数据时不再刷新数据 | 否
multiple |`bool`| false |是否单选， true 多选，false 单选， 同时多选时不会有确认和取消按钮，多选时会出现复选框 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
param|`object`| {} |refModelUrl 中接口请求的参数 | 否
refModelUrl |`object`|{tableBodyUrl:'',refInfo:''} |弹出层数据接口地址，为了兼容其他参照保留了多连接配置。<br/>如：<br/>{ <br/>tableBodyUrl:'blobRefTreeGrid',//表体请求<br />tableBarUrl:'refInfo',//表头请求<br />} | 是
matchUrl| ``string``|空|查询并校验 value 中的 refpk 对应参照的详细记录并且修改checkedArray。 当需要请求接口获取完整数据时，可以传入checkedArray=[]，value中refpk不为空就可以|否
checkedArray| `array`|[]|已选择数据。注意，当使用RefMultipleTableWithInput 或者 搭配refcorewithinput使用时，checkedArray这个参数不起效且初始值默认[] | 否
filterUrl| ``string``|空|快捷录入接口。|否
<s>fliterColumn| ``array``|空|<s>行内筛选配置的筛选项，无则没有，详情请查看参数详解</s>|否</s>
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons|`object`| - |{buttons:{cancelText:'',confirmText:'',okText:''}} 按钮文字展示| 否
emptyBut| `bool` | false| 清空按钮是否展示 |否
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel  |`function()` | -- | 关闭弹出层 | 否
jsonp| `bool` | false | refInfo和matchUrl的request请求传参jsonp| 否
headers| -- | -- | refInfo、tableBodyUrl和matchUrl的request请求传参headers| 否
onMatchInitValue| `function(data)` | -- | 返回matchUrl请求的全部数据|否
onAfterAjax| `function(data)`| -- |tableBodyUrl请求后的回调，返回全部数据| 否
miniSearch| `Boolean`|true|默认是简单搜索|否
size|`String`|'lg'|modal的size|否
onClear|`function`|-|复杂搜索清空操作回调|否
onSearch|`function`|-|复杂搜索搜索操作回调，返回搜索values|否
theme| `String` | 'ref-red' | 启用参照默认样式，theme=''关闭参照默认样式| 否
searchPanelLocale | `Object` | {'title': '条件筛选EN','resetName': '重置En','searchName': '查询EN','down':'打开EN','up':'关闭EN',} | 复杂搜索标题，按钮的文字等信息 | 否
mustPaginationShow | `bool` | false | true必须展示分页、false，当pageCount>1才展示分页| 否
tableProps | `object`| {} | table上其他属性，具体接收的参数参照bee-table| 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否



##### 6.2.2.3 RefMultipleTableWithInput 增量 API
<span style="color: red; font-size: 15px;">注意:以下参数为 `<RefMultipleTableWithInput/>`独有。对其他两个类型的引用无效。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

##### 6.2.2.4 参数详解

```js
eg:
   此次分页符为强制分页符，同时只有一页数据的时候不会显示。
   
   //行内删选配置 详情请查阅 http://bee.tinper.org/bee-table#bee-table 中“组合过滤和其他功能使用”
   fliterColumn: [{
        dataIndex: "type",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "text",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    },{
        dataIndex: "level",
        filterDropdown: "show",
        filterDropdownType: "string",
        filterType: "dropdown",
        filterDropdownIncludeKeys: ['LIKE', 'ULIKE', 'EQ']
    }]

    lang:
      "zh_CN" // 中文
      "en_US" // 英文
      "zh_TW" // 繁体中文
      "fr_FR" // 法文
      "de_DE" // 德文
      "ja_JP" // 日文
```

#### 6.2.3 pap-common-treeTable 树表参照

##### 6.2.3.1 树形参照分类为下列四种

* RefTreeTable
    
    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。

* RefTreeTableWithInput
    
    带文本框的参照弹出窗。在 RefTreeTable 基础上封装实现。

* createRefTreeTable
    
    非 ReactJS 调用方式，与 RefTreeTable 相同没有输入框，使用时可根据自己需要定义具体的文本框。

* createRefTreeTableModal

    非 ReactJS 调用方式，与  RefTreeTableWithInput 相同带文本框的参照弹出窗。

##### 6.2.3.2 API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTableWithInput 输入框的样式，默认为空。 | 否
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
multiple |`bool`| false |是否单选， true 单选，false 多选 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字，若 
hasPage |`bool`|true |是否有分页条，true 有，false 没有 | 否
tabData |`array`|true |当参照有多个类型的数据时可启用tab标签页来区分，当个点击页签的时候，会根据配置的key再去查询。如：<br />[<br />{"title":"常用","key":"commonUse"},<br /> {"title":"全部","key":"total"},<br />{"title":"推荐","key":"recommed"}<br />] | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开 | 否
checkStrictly |`bool`|false|heckable状态下节点选择完全受控（父子节点选中状态不再关联）, false 关联选择，true 不关联| 否
param |`objecet`|{} |接口请求参数 | 是
refModelUrl |`object`|{treeUrl:'',tableBodyUrl:'',refInfo:'',保留了多连接配置。<br/>如：<br/>{ <br/> treeUrl: '/api/user/treeUrl.json',<br/>tableBodyUrl:'blobRefTreeTableGrid',//表体请求<br />refInfo:'refInfo',//表头请求<br />} | 是
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel | `function(  )`|-- |关闭弹出层 | 否
jsonp| `bool` | false | treeUrl、tableBodyUrl、refInfo、matchUrl的request请求传参jsonp| 否
onAfterAjax| `function(data)`| -- |treeUrl和tableBodyUrl请求后的回调，返回全部数据| 否
onTreeLoading | `function(state)` | --|回调函数，三种结果'loaded'、'loading'、'fail',表示树的请求三种状态|否
menuTitle | `String` | ''| 左树的标题| 否
tableTitle | `String` | '' | 右表的标题 | 否
nodeDisplay |<code>string 或 function</code>| `{refname}` |节点渲染时可匹配的内容，这里为了提供根据数据渲染节点图标使用 | 否
lazyModal |`bool`| false |数据懒加载模式，true 启用，false 不启用 | 否
param|`object`| {} |refModelUrl 中接口请求的参数 | 否
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开。前提lazyModal是true| 否
onChange| `function(checkedArray)`| -- | 左树选中回调函数| 否
theme| `String` | 'ref-red' | 启用参照默认样式，theme=''关闭参照默认样式| 否
<s>emptyBut|`bool`|true |是否显示清空按钮，true 显示，false 不显示、sebottomButton 为 false 则该配置无效。| 否 </s>
<s> bottomButton |`bool`|true | 是否显示弹出层下边框工具栏， false不显示 true 显示`注意该属性为临时兼容配置后期可能随时会弃用` | 否 </s>
miniSearch(右表)| `Boolean`|true|左表默认是简单搜索|否
matchUrl| ``string``|空|查询并校验 value 中的 refpk 对应参照的详细记录并且修改checkedArray。 当需要请求接口获取完整数据时，可以传入checkedArray=[]，value中refpk不为空就可以|否
checkedArray | `array`|[]|已选择数据。注意，当使用RefTreeTableWithInput 或者 搭配refcorewithinput使用时，checkedArray这个参数不起效且初始值默认[] | 否
headers(右表)| -- | -- | refInfo、tableBodyUrl和matchUrl的request请求传参headers| 否
onMatchInitValue(右表)| `function(data)` | -- | 返回matchUrl请求的全部数据|否
mustPaginationShow | `bool` | false | true必须展示分页、false，当pageCount>1才展示分页| 否
tableProps | `object`| {} | table上其他属性，具体接收的参数参照bee-table| 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否


##### 6.2.3.3 RefTreeTableWithInput 增量 API
<span style="color: red; font-size: 15px;">注意:以下参数为 `<RefTreeTableWithInput/>`独有。对其他两个类型的引用无效。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 


##### 6.2.3.4 参数详解

```js
eg:

value:
//需要组装出详细记录，但只要保证 displayField 和 valueField 所标记的字段存在即可， 如：
'{ "refpk": "857c41b","refcode": "wujd", "refname": "吴惊道" }'
或者
'{ "refpk": "65c2c42", "refcode": "ms", "refname": "马帅" }'
```

#### 6.2.4 pap-common-treeTransfer 树穿梭参照

##### 6.2.4.1 参照分类为下列三种

* RefTreeTransfer
    
    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。

* RefTreeTransferWithInput
    
    带文本框的参照弹出窗。在 RefTreeTransfer 基础上封装实现。

* createRefTreeTransfer
    
    非 ReactJS 调用方式，与 RefTreeTransfer 相同没有输入框，使用时可根据自己需要定义具体的文本框。


##### 6.2.4.2 API

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTransferWithInput 输入框的样式，默认为空。'ref-walsin-modal'参照使用另外一种风格 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字，若 bottomButton 为 false 则该配置无效。| 否
textOption | `object` | -- | 左边树和右边处穿梭框的标题<br /> 如：<br />{<br />    leftTitle:'树',<br />    rightTitle:'穿梭框',<br />leftTransferText:'左侧穿梭框上标题',<br/>rightTransferText:'右侧穿梭框上标题'}| 否
param |`objecet`|{} |接口请求参数 | 是
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
refModelUrl |`object`|{tableBodyUrl:'',treeUrl:''，tableBodyUrlSearch:''} |弹出层数据接口地址，为了兼容其他参照保留了多连接配置。<br/>如：<br/>{ <br/>treeUrl: '/api/user/blobRefTreeTransfer.json',<br/>tableBodyUrl:'blobRefTreeTransferGrid',//表体请求<br />tableBodyUrlSearch:'blobRefTreeTransferGrid',//搜索时表体请求} | 是
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel `|function(  )`|-- |关闭弹出层 | 否
jsonp| `bool` | false | treeUrl、tableBodyUrl和tableBodyUrlSearch的request请求传参jsonp| 否
headers| -- | -- | matchUrl的request请求传参headers| 否
onMatchInitValue| `function(data)` | -- | 返回matchUrl请求的全部数据|否
onAfterAjax| `function(data)`| -- |treeUrl请求后的回调，返回全部数据| 否
defaultSelectNode| `object` | -- |已选的树节点并以此进行tableBodyUrl请求|否
theme| `String` | 'ref-red' | 启用参照默认样式，theme=''关闭参照默认样式| 否
searchPlaceholder| `String` | '搜索' |搜索框的默认显示文字 | 否
notFoundContent| `String或者ReactNode` | '<div>无数据</div>' |当没有相关内容的显示内容	 | 否
modalProps | `object`| {} | modal上其他属性，具体接收的参数参照bee-modal| 否
transferProps| `object`| {} | modal上其他属性，具体接收的参数参照bee-transfer| 否

##### 6.2.4.3 RefTreeTransferWithInput 增量 API
<span style="color: red; font-size: 15px;">注意:以下参数为 `<RefTreeTableWithInput/>`独有。对其他两个类型的引用无效。</span>

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

##### 6.2.4.4 参数详解

```js
eg:

defaultSelectNode:
//需要组装出详细记录，但只要保证 displayField 和 valueField 所标记的字段存在即可， 如：

{ "refpk": "857c41b","refcode": "wujd", "refname": "吴惊道" },
或者
{ "refpk": "65c2c42", "refcode": "ms", "refname": "马帅" }

```