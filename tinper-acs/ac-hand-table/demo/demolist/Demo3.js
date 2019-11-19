/**
 *
 * @title 表格参照
 * @description  下拉搜索、表参照、树参照、表格参照、树穿梭参照
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';

// 引入 AcHandTable 组件
// demo 工程中引入方式
import AcHandTable from '../../src/index';
import '../../src/index.less';

// 项目中引入方式
// import AcHandTable from 'ac-hand-table';
// import 'ac-hand-table/dist/index.css';

// 表格数据
const data = [
  {
    id: 1,
    code: '0000-0001',
    autocomplete: 'xxxxx',
    staff: '杜甫',
    department: '用友集团',
    department_staff: '张一',
    department_staff_transfer: '',
  },
  {
    id: 2,
    code: '0000-0002',
    autocomplete: 'xxxxx',
    staff: '李白',
    department: '用友股份',
    department_staff: '',
    department_staff_transfer: '',

  },
  {
    id: 3,
    code: '0000-0003',
    autocomplete: 'xxxxx',
    staff: '白居易',
    department: '江西分公司',
    department_staff: '',
    department_staff_transfer: '',
  },
];

// 模拟表格
const refTableData = {
  columnsData: [
    {
      key: 'code',
      dataIndex: 'code',
      title: '人员编码',
    }, {
      key: 'name',
      dataIndex: 'name',
      title: '人员名称',
    },
  ],
  tableData: [
    {
      rownum_: 1,
      code: '001',
      name: '人员1',
      mobile: '15011430230',
      refcode: '001',
      refpk: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      id: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      refname: '人员1',
      email: '11@11.com',
      key: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
    }, {
      rownum_: 2,
      code: '002',
      name: '人员2',
      mobile: '15011323234',
      refcode: '002',
      refpk: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      id: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      refname: '人员2',
      email: '22@11.com',
      key: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
    }, {
      rownum_: 3,
      code: '003',
      name: '人员3',
      mobile: '15011430232',
      refcode: '003',
      refpk: '004989bb-a705-45ce-88f3-662f87ee6e52',
      id: '004989bb-a705-45ce-88f3-662f87ee6e52',
      refname: '人员3',
      email: '33@33.com',
      key: '004989bb-a705-45ce-88f3-662f87ee6e52',
    }, {
      rownum_: 4,
      code: '004',
      name: '人员4',
      mobile: '15011430234',
      refcode: '004',
      refpk: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      id: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      refname: '人员4',
      email: '33@34.com',
      key: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
    }, {
      rownum_: 5,
      code: '005',
      name: '人员5',
      mobile: '15011430235',
      refcode: '005',
      refpk: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      id: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      refname: '人员5',
      email: '55@26.com',
      key: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
    }, {
      rownum_: 6,
      code: '006',
      name: '人员6',
      mobile: '15011323232',
      refcode: '006',
      refpk: '112621b9-b7ae-41b9-9428-61779334c5d6',
      id: '112621b9-b7ae-41b9-9428-61779334c5d6',
      refname: '人员6',
      email: '66@516.com',
      key: '112621b9-b7ae-41b9-9428-61779334c5d6',
    }, {
      rownum_: 7,
      code: '007',
      name: '人员7',
      mobile: '15011234567',
      refcode: '007',
      refpk: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      id: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      refname: '人员7',
      email: '55@4.com',
      key: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
    }, {
      rownum_: 8,
      code: '008',
      name: '人员8',
      mobile: '15011327890',
      refcode: '008',
      refpk: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      id: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      refname: '人员8',
      email: '55@556.com',
      key: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
    }, {
      rownum_: 9,
      code: 'bpm01',
      name: '张一',
      mobile: '18777777777',
      refcode: 'bpm01',
      refpk: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      id: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      refname: '张一',
      email: 'bpm01@qq.com',
      key: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
    }, {
      rownum_: 10,
      code: 'bpm02',
      name: '张二',
      mobile: '18788888888',
      refcode: 'bpm02',
      refpk: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      id: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      refname: '张二',
      email: 'bpm02@qq.com',
      key: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
    }],
};

// 模拟树参照
const refTreeData = [
  {
    code: 'org1',
    children: [
      {
        code: 'bj',
        entityType: 'mainEntity',
        name: '北京总部-简',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'bj',
        refpk: '5305416e-e7b4-4051-90bd-12d12942295b',
        id: '5305416e-e7b4-4051-90bd-12d12942295b',
        isLeaf: 'true',
        refname: '北京总部-简',
      },
      {
        code: 'xd',
        entityType: 'mainEntity',
        name: '新道-简',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'xd',
        refpk: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
        id: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
        isLeaf: 'true',
        refname: '新道-简',
      },
      {
        code: 'yy3',
        entityType: 'mainEntity',
        name: 'test3',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'yy3',
        refpk: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
        id: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
        isLeaf: 'true',
        refname: 'test3',
      }, {
        code: 'yy1',
        entityType: 'mainEntity',
        name: 'test1',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'yy1',
        refpk: 'fd32ceeb-57a8-4f44-816e-fa660f5715ab',
        id: 'fd32ceeb-57a8-4f44-816e-fa660f5715ab',
        isLeaf: 'true',
        refname: 'test1',
      }, {
        code: 'dept2',
        children: [{
          code: 'cs',
          entityType: 'subEntity',
          organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
          name: '测试部-简',
          pid: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
          refcode: 'cs',
          refpk: 'cc43a66a-438d-4106-937f-bec44406f771',
          id: 'cc43a66a-438d-4106-937f-bec44406f771',
          isLeaf: 'true',
          refname: '测试部-简',
        }, {
          code: 'qd',
          entityType: 'subEntity',
          organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
          name: '前端部-简',
          pid: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
          refcode: 'qd',
          refpk: '73a10edd-aae8-4f31-af25-1f48f0a3b344',
          id: '73a10edd-aae8-4f31-af25-1f48f0a3b344',
          isLeaf: 'true',
          refname: '前端部-简',
        }],
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '生产处',
        refcode: 'dept2',
        refpk: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
        id: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
        refname: '生产处',
      }, {
        code: 'dept1',
        children: [{
          code: 'dept1_2',
          entityType: 'subEntity',
          organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
          name: '财务二科',
          pid: '95b60f35-ed0b-454e-b948-fb45ae30b911',
          refcode: 'dept1_2',
          refpk: '55b7fff1-6579-4ca9-92b7-3271d288b9f3',
          id: '55b7fff1-6579-4ca9-92b7-3271d288b9f3',
          isLeaf: 'true',
          refname: '财务二科',
        }, {
          code: 'dept1_1',
          entityType: 'subEntity',
          organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
          name: '财务一科',
          pid: '95b60f35-ed0b-454e-b948-fb45ae30b911',
          refcode: 'dept1_1',
          refpk: '9711d912-3184-4063-90c5-1facc727813c',
          id: '9711d912-3184-4063-90c5-1facc727813c',
          isLeaf: 'true',
          refname: '财务一科',
        }],
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '财务处',
        refcode: 'dept1',
        refpk: '95b60f35-ed0b-454e-b948-fb45ae30b911',
        id: '95b60f35-ed0b-454e-b948-fb45ae30b911',
        refname: '财务处',
      }],
    entityType: 'mainEntity',
    name: '用友集团',
    refcode: 'org1',
    refpk: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    refname: '用友集团',
  },
];

// 模拟树表数据
const refTreeTableData = {
  columnsData: [
    {
      key: 'code',
      dataIndex: 'code',
      title: '组织编码',
    }, {
      key: 'name',
      dataIndex: 'name',
      title: '组织名称',
    },
  ],
  tableData: [
    {
      rownum_: 1,
      code: '001',
      name: '人员1',
      mobile: '15011430230',
      refcode: '001',
      refpk: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      id: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      refname: '人员1',
      email: '11@11.com',
      key: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
    }, {
      rownum_: 2,
      code: '002',
      name: '人员2',
      mobile: '15011323234',
      refcode: '002',
      refpk: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      id: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      refname: '人员2',
      email: '22@11.com',
      key: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
    }, {
      rownum_: 3,
      code: '003',
      name: '人员3',
      mobile: '15011430232',
      refcode: '003',
      refpk: '004989bb-a705-45ce-88f3-662f87ee6e52',
      id: '004989bb-a705-45ce-88f3-662f87ee6e52',
      refname: '人员3',
      email: '33@33.com',
      key: '004989bb-a705-45ce-88f3-662f87ee6e52',
    }, {
      rownum_: 4,
      code: '004',
      name: '人员4',
      mobile: '15011430234',
      refcode: '004',
      refpk: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      id: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      refname: '人员4',
      email: '33@34.com',
      key: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
    }, {
      rownum_: 5,
      code: '005',
      name: '人员5',
      mobile: '15011430235',
      refcode: '005',
      refpk: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      id: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      refname: '人员5',
      email: '55@26.com',
      key: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
    }, {
      rownum_: 6,
      code: '006',
      name: '人员6',
      mobile: '15011323232',
      refcode: '006',
      refpk: '112621b9-b7ae-41b9-9428-61779334c5d6',
      id: '112621b9-b7ae-41b9-9428-61779334c5d6',
      refname: '人员6',
      email: '66@516.com',
      key: '112621b9-b7ae-41b9-9428-61779334c5d6',
    }, {
      rownum_: 7,
      code: '007',
      name: '人员7',
      mobile: '15011234567',
      refcode: '007',
      refpk: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      id: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      refname: '人员7',
      email: '55@4.com',
      key: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
    }, {
      rownum_: 8,
      code: '008',
      name: '人员8',
      mobile: '15011327890',
      refcode: '008',
      refpk: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      id: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      refname: '人员8',
      email: '55@556.com',
      key: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
    }, {
      rownum_: 9,
      code: 'bpm01',
      name: '张一',
      mobile: '18777777777',
      refcode: 'bpm01',
      refpk: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      id: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      refname: '张一',
      email: 'bpm01@qq.com',
      key: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
    }, {
      rownum_: 10,
      code: 'bpm02',
      name: '张二',
      mobile: '18788888888',
      refcode: 'bpm02',
      refpk: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      id: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      refname: '张二',
      email: 'bpm02@qq.com',
      key: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
    }],
  treeData: [{
    code: 'org1',
    children: [{
      code: 'bj',
      entityType: 'mainEntity',
      name: '北京总部-简',
      pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      refcode: 'bj',
      refpk: '5305416e-e7b4-4051-90bd-12d12942295b',
      id: '5305416e-e7b4-4051-90bd-12d12942295b',
      isLeaf: 'true',
      refname: '北京总部-简',
    }, {
      code: 'xd',
      entityType: 'mainEntity',
      name: '新道-简',
      pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      refcode: 'xd',
      refpk: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
      id: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
      isLeaf: 'true',
      refname: '新道-简',
    }, {
      code: 'yy3',
      entityType: 'mainEntity',
      name: 'test3',
      pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      refcode: 'yy3',
      refpk: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
      id: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
      isLeaf: 'true',
      refname: 'test3',
    }, {
      code: 'yy1',
      entityType: 'mainEntity',
      name: 'test1',
      pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      refcode: 'yy1',
      refpk: 'fd32ceeb-57a8-4f44-816e-fa660f5715ab',
      id: 'fd32ceeb-57a8-4f44-816e-fa660f5715ab',
      isLeaf: 'true',
      refname: 'test1',
    }, {
      code: 'dept2',
      children: [{
        code: 'cs',
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '测试部-简',
        pid: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
        refcode: 'cs',
        refpk: 'cc43a66a-438d-4106-937f-bec44406f771',
        id: 'cc43a66a-438d-4106-937f-bec44406f771',
        isLeaf: 'true',
        refname: '测试部-简',
      }, {
        code: 'qd',
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '前端部-简',
        pid: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
        refcode: 'qd',
        refpk: '73a10edd-aae8-4f31-af25-1f48f0a3b344',
        id: '73a10edd-aae8-4f31-af25-1f48f0a3b344',
        isLeaf: 'true',
        refname: '前端部-简',
      }],
      entityType: 'subEntity',
      organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      name: '生产处',
      refcode: 'dept2',
      refpk: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
      id: '0ebbb6d8-250a-4d1d-a019-7ae951629a2c',
      refname: '生产处',
    }, {
      code: 'dept1',
      children: [{
        code: 'dept1_2',
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '财务二科',
        pid: '95b60f35-ed0b-454e-b948-fb45ae30b911',
        refcode: 'dept1_2',
        refpk: '55b7fff1-6579-4ca9-92b7-3271d288b9f3',
        id: '55b7fff1-6579-4ca9-92b7-3271d288b9f3',
        isLeaf: 'true',
        refname: '财务二科',
      }, {
        code: 'dept1_1',
        entityType: 'subEntity',
        organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        name: '财务一科',
        pid: '95b60f35-ed0b-454e-b948-fb45ae30b911',
        refcode: 'dept1_1',
        refpk: '9711d912-3184-4063-90c5-1facc727813c',
        id: '9711d912-3184-4063-90c5-1facc727813c',
        isLeaf: 'true',
        refname: '财务一科',
      }],
      entityType: 'subEntity',
      organization_id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      name: '财务处',
      refcode: 'dept1',
      refpk: '95b60f35-ed0b-454e-b948-fb45ae30b911',
      id: '95b60f35-ed0b-454e-b948-fb45ae30b911',
      refname: '财务处',
    }],
    entityType: 'mainEntity',
    name: '用友集团',
    refcode: 'org1',
    refpk: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    refname: '用友集团',
  }],
  originTableData: [
    {
      rownum_: 1,
      code: '001',
      name: '人员1',
      mobile: '15011430230',
      refcode: '001',
      refpk: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      id: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      refname: '人员1',
      email: '11@11.com',
      key: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
    }, {
      rownum_: 2,
      code: '002',
      name: '人员2',
      mobile: '15011323234',
      refcode: '002',
      refpk: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      id: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
      refname: '人员2',
      email: '22@11.com',
      key: 'de2d4d09-51ec-4108-8def-d6a6c5393c3b',
    }, {
      rownum_: 3,
      code: '003',
      name: '人员3',
      mobile: '15011430232',
      refcode: '003',
      refpk: '004989bb-a705-45ce-88f3-662f87ee6e52',
      id: '004989bb-a705-45ce-88f3-662f87ee6e52',
      refname: '人员3',
      email: '33@33.com',
      key: '004989bb-a705-45ce-88f3-662f87ee6e52',
    }, {
      rownum_: 4,
      code: '004',
      name: '人员4',
      mobile: '15011430234',
      refcode: '004',
      refpk: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      id: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
      refname: '人员4',
      email: '33@34.com',
      key: '3570cbde-0d43-49ce-ad53-ab27ee6ee7dd',
    }, {
      rownum_: 5,
      code: '005',
      name: '人员5',
      mobile: '15011430235',
      refcode: '005',
      refpk: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      id: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
      refname: '人员5',
      email: '55@26.com',
      key: '5e3a85ec-5e14-4734-8b3a-1e6168426c89',
    }, {
      rownum_: 6,
      code: '006',
      name: '人员6',
      mobile: '15011323232',
      refcode: '006',
      refpk: '112621b9-b7ae-41b9-9428-61779334c5d6',
      id: '112621b9-b7ae-41b9-9428-61779334c5d6',
      refname: '人员6',
      email: '66@516.com',
      key: '112621b9-b7ae-41b9-9428-61779334c5d6',
    }, {
      rownum_: 7,
      code: '007',
      name: '人员7',
      mobile: '15011234567',
      refcode: '007',
      refpk: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      id: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
      refname: '人员7',
      email: '55@4.com',
      key: '394bba90-ed0f-4794-a44e-fd9ce6e9257d',
    }, {
      rownum_: 8,
      code: '008',
      name: '人员8',
      mobile: '15011327890',
      refcode: '008',
      refpk: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      id: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
      refname: '人员8',
      email: '55@556.com',
      key: 'a9f4c869-ca0b-4d12-847e-00eca08bfef6',
    }, {
      rownum_: 9,
      code: 'bpm01',
      name: '张一',
      mobile: '18777777777',
      refcode: 'bpm01',
      refpk: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      id: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
      refname: '张一',
      email: 'bpm01@qq.com',
      key: '0dc47840-873a-4ed3-8ae7-c2335a76b385',
    }, {
      rownum_: 10,
      code: 'bpm02',
      name: '张二',
      mobile: '18788888888',
      refcode: 'bpm02',
      refpk: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      id: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
      refname: '张二',
      email: 'bpm02@qq.com',
      key: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
    },
  ],
  page: {
    pageCount: 1, // 总页数
    pageSize: '10', // 每页数据数
    totalElements: 9,
  },

};

// 模拟穿梭数据
const refTreeTransferData = {
  treeData: [
    {
      children: [{
        children: [],
        pid: 'lkp',
        refpk: '857c41b7-e1a3-11e5-aa70-0242ac11001d',
        refcode: 'wujd',
        id: 'wujd',
        isLeaf: 'true',
        refname: '开发部',
      }, {
        children: [],
        pid: 'lkp',
        refpk: '780aca16-e1a3-11e5-aa70-0242ac11001d',
        refcode: 'fzl',
        id: 'fzl',
        isLeaf: 'true',
        refname: '人事部',
      }],
      pid: '',
      refpk: '708918f5-e1a3-11e5-aa70-0242ac11001d',
      refcode: 'lkp',
      id: 'lkp',
      refname: '总公司',
    }],
  transferData: [
    {
      rownum_: 1,
      login_name: '43',
      name: '花43',
      refcode: '43',
      refpk: '718dda50629e4f8a8833b5d17de85280',
      id: '718dda50629e4f8a8833b5d17de85280',
      refname: '花43',
      key: '43',
      title: '花43-43',
    }, {
      rownum_: 2,
      login_name: '46',
      name: '花46',
      refcode: '46',
      refpk: 'b595b95cf45348d7aadb7ae349a89a76',
      id: 'b595b95cf45348d7aadb7ae349a89a76',
      refname: '花46',
      key: '46',
      title: '花46-46',
    }, {
      rownum_: 3,
      login_name: '48',
      name: '花48',
      refcode: '48',
      refpk: '62310dd3677440ef96042b9c3ad135e2',
      id: '62310dd3677440ef96042b9c3ad135e2',
      refname: '花48',
      key: '48',
      title: '花48-48',
    }, {
      rownum_: 4,
      login_name: '53',
      name: '花53',
      refcode: '53',
      refpk: 'd64f7d6e6d014d40841415cd35a43dcf',
      id: 'd64f7d6e6d014d40841415cd35a43dcf',
      refname: '花53',
      key: '53',
      title: '花53-53',
    }, {
      rownum_: 5,
      login_name: '70',
      name: '花70',
      refcode: '70',
      refpk: '2ff33db8d1e94bcbaf9ba45e1ad6ea9c',
      id: '2ff33db8d1e94bcbaf9ba45e1ad6ea9c',
      refname: '花70',
      key: '70',
      title: '花70-70',
    }, {
      rownum_: 6,
      login_name: '73',
      name: '花73',
      refcode: '73',
      refpk: '6d8328debfc94d5b8446f58d2b0b3cdc',
      id: '6d8328debfc94d5b8446f58d2b0b3cdc',
      refname: '花73',
      key: '73',
      title: '花73-73',
    }, {
      rownum_: 7,
      login_name: '76',
      name: '花76',
      refcode: '76',
      refpk: '7768b51dc14544669f2cffa840edb049',
      id: '7768b51dc14544669f2cffa840edb049',
      refname: '花76',
      key: '76',
      title: '花76-76',
    }, {
      rownum_: 8,
      login_name: '80',
      name: '花80',
      refcode: '80',
      refpk: 'a89cc45ed1ec49f19bb608c18c958359',
      id: 'a89cc45ed1ec49f19bb608c18c958359',
      refname: '花80',
      key: '80',
      title: '花80-80',
    }, {
      rownum_: 9,
      login_name: '78',
      name: '花78',
      refcode: '78',
      refpk: '438d0cce9ae442e586940a582c7ee054',
      id: '438d0cce9ae442e586940a582c7ee054',
      refname: '花78',
      key: '78',
      title: '花78-78',
    }, {
      rownum_: 10,
      login_name: '79',
      name: '花79',
      refcode: '79',
      refpk: '60adbcb7d4cb49449bc7879dd4fbf1f5',
      id: '60adbcb7d4cb49449bc7879dd4fbf1f5',
      refname: '花79',
      key: '79',
      title: '花79-79',
    }, {
      login_name: 'zhao',
      refpk: '14e0220f-1a86-4861-8f74-f7134cb3235b',
      id: '14e0220f-1a86-4861-8f74-f7134cb3235b',
      refcode: 'zhao',
      name: '赵宇',
      refname: '赵宇',
      key: 'zhao',
      title: '赵宇-zhao',
    }, {
      login_name: 'chen',
      refpk: '14e0220f-1a86-4861-8f74-f71343333b5b',
      id: '14e0220f-1a86-4861-8f74-f71343333b5b',
      refcode: 'chen',
      name: '陈辉',
      refname: '陈辉',
      key: 'chen',
      title: '陈辉-chen',
    }, {
      login_name: 'yue',
      refpk: '14e0220f-1a86-4861-8f74-545454547489',
      id: '14e0220f-1a86-4861-8f74-545454547489',
      refcode: 'yue',
      name: '岳明',
      refname: '岳明',
      key: 'yue',
      title: '岳明-yue',
    }, {
      login_name: 'xiao',
      refpk: '14e0220f-1a86-4861-8f74-543434537379',
      id: '14e0220f-1a86-4861-8f74-543434537379',
      refcode: 'xiao',
      name: '小羽',
      refname: '小羽',
      key: 'xiao',
      title: '小羽-xiao',
    }, {
      login_name: '123',
      refpk: '14e0220f-1a86-4861-8f74-334455643336',
      id: '14e0220f-1a86-4861-8f74-334455643336',
      refcode: '123',
      name: '123',
      refname: '123',
      key: '123',
      title: '123-123',
    }, {
      login_name: 'huang',
      refpk: '14e0220f-1a86-4861-8f74-333387127390',
      id: '14e0220f-1a86-4861-8f74-333387127390',
      refcode: 'huang',
      name: '黄东东',
      refname: '黄东东',
      key: 'huang',
      title: '黄东东-huang',
    }, {
      login_name: 'liu',
      refpk: '14e0220f-1a86-4861-8f74-3332332kjffo',
      id: '14e0220f-1a86-4861-8f74-3332332kjffo',
      refcode: 'liu',
      name: '刘志鹏',
      refname: '刘志鹏',
      key: 'liu',
      title: '刘志鹏-liu',
    }, {
      login_name: 'liukunlin',
      refpk: '14e0220f-1a86-4861-8f74-23323e321263',
      id: '14e0220f-1a86-4861-8f74-23323e321263',
      refcode: 'liukunlin',
      name: '刘坤琳',
      refname: '刘坤琳',
      key: 'liukunlin',
      title: '刘坤琳-liukunlin',
    }],
};


// 模拟表格搜索数据
const refTableSearch = [
  {
    rownum_: 10,
    code: 'bpm02',
    name: '张二',
    mobile: '18788888888',
    refcode: 'bpm02',
    refpk: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
    id: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
    refname: '张二',
    email: 'bpm02@qq.com',
    key: 'c97b59e2-9fa3-44d7-93b0-1be52f7aa550',
  },
];
// 模拟树搜索数据
const refTreeSearch = [
  {
    code: 'org1',
    children: [
      {
        code: 'bj',
        entityType: 'mainEntity',
        name: '北京总部-简',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'bj',
        refpk: '5305416e-e7b4-4051-90bd-12d12942295b',
        id: '5305416e-e7b4-4051-90bd-12d12942295b',
        isLeaf: 'true',
        refname: '北京总部-简',
      },
      {
        code: 'xd',
        entityType: 'mainEntity',
        name: '新道-简',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'xd',
        refpk: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
        id: 'b691afff-ea83-4a3f-affa-beb2be9cba52',
        isLeaf: 'true',
        refname: '新道-简',
      },
      {
        code: 'yy3',
        entityType: 'mainEntity',
        name: 'test3',
        pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
        refcode: 'yy3',
        refpk: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
        id: 'e75694d9-7c00-4e9e-9573-d29465ae79a9',
        isLeaf: 'true',
        refname: 'test3',
      },
    ],
    entityType: 'mainEntity',
    name: '用友集团',
    refcode: 'org1',
    refpk: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    refname: '用友集团',
  },
];
// 模拟树表搜索数据
const refTreeTableSearch = {
  tableData: [
    {
      rownum_: 1,
      code: '001',
      name: '人员1',
      mobile: '15011430230',
      refcode: '001',
      refpk: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      id: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
      refname: '人员1',
      email: '11@11.com',
      key: 'cc791b77-bd18-49ab-b3ec-ee83cd40012a',
    }],
  treeData: [{
    code: 'org1',
    children: [{
      code: 'bj',
      entityType: 'mainEntity',
      name: '北京总部-简',
      pid: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
      refcode: 'bj',
      refpk: '5305416e-e7b4-4051-90bd-12d12942295b',
      id: '5305416e-e7b4-4051-90bd-12d12942295b',
      isLeaf: 'true',
      refname: '北京总部-简',
    }],
    entityType: 'mainEntity',
    name: '用友集团',
    refcode: 'org1',
    refpk: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    id: 'a4cf0601-51e6-4012-9967-b7a64a4b2d47',
    refname: '用友集团',
  }],
  page: {
    pageCount: 1, // 总页数
    pageSize: '10', // 每页数据数
    totalElements: 9,
  },
};
// 模拟穿梭选中搜索
const transferTreeSelect = [
  {
    rownum_: 1,
    login_name: '43',
    name: '花43',
    refcode: '43',
    refpk: '718dda50629e4f8a8833b5d17de85280',
    id: '718dda50629e4f8a8833b5d17de85280',
    refname: '花43',
    key: '43',
    title: '花43-43',
  }, {
    rownum_: 2,
    login_name: '46',
    name: '花46',
    refcode: '46',
    refpk: 'b595b95cf45348d7aadb7ae349a89a76',
    id: 'b595b95cf45348d7aadb7ae349a89a76',
    refname: '花46',
    key: '46',
    title: '花46-46',
  }, {
    rownum_: 3,
    login_name: '48',
    name: '花48',
    refcode: '48',
    refpk: '62310dd3677440ef96042b9c3ad135e2',
    id: '62310dd3677440ef96042b9c3ad135e2',
    refname: '花48',
    key: '48',
    title: '花48-48',
  }];

class Demo3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delRows: [],
      handData: data,
    };
  }

  columns = [
    {
      data: 'code',
      type: 'text',
      validator: (value, callback) => {
        callback(!!value);
      },
      allowInvalid: true,
      strict: true,
      onClick: (rowData, rowNum, value) => {
        console.log('rowData, rowNum, value', rowData, rowNum, value);
      },
      refConfig: {
        isThreeBar: true, // 是否出现三道杠
        columnsKey: ['refname', 'id', 'code'], // 约定第一个为回写值,即表格中展示的数据
        refKey: ['refname', 'id', 'code'], // 约定第一个为回写值,即表格中展示的数据
      },
    },

    {
      data: 'autocomplete',
      type: 'autocomplete',  // 下拉框
      validator: (value, callback) => { // 必输项
        callback(!!value);
      },
      onClick: (rowData, rowNum, value) => {
        this.setState({ rowData });
      },
      refSource: (value, type, callback) => {

        const { rowData } = this.state;
        console.log('value, type', value, type, rowData);
        const data = [
          {
            id: '1',
            code: '1',
            refname: 'xxxx',
            selectValue: 'xxxx-1-1',
          }, {
            id: '2',
            code: '2',
            refname: 'yyyyy',
            selectValue: 'yyyyy-2-2',
          }, {
            id: '3',
            code: '3',
            refname: 'zzzz',
            selectValue: 'zzzz-3-3',
          }];

        return callback(data);
      },
      refConfig: {
        refValue: 'selectValue', // 下拉显示值
        rowKey: ['autocomplete', 'refCode'],
      },
      refOnChange: (refData, rowData, rowNum) => { // 下拉选中数据回调
        const { refname, code } = refData;

        if (refname) {
          rowData.autocomplete = refname;
          rowData.refCode = code;
        } else {
          // 删除
          delete rowData.refCode;
          // 清空
          // rowData.refCode="";
        }
        this.child.onUpdateRowData(rowNum, rowData);
      },


    },

    {
      data: 'staff',
      type: 'refMultipleTable', // 表格
      refConfig: {
        isThreeBar: true, // 是否出现三道杠
        columnsData: refTableData.columnsData,
        columnsKey: ['name', 'email', 'mobile'], // 约定第一个为回写值
        rowKey: ['staff', 'staffEmail', 'staffMobile'],

      },
      refSource: (value, type, callback) => { // 表格简单搜索
        console.log('refSearch--table', value, type);
        const result = { tableData: refTableData.tableData };
        if (value) {
          result.tableData = refTableSearch;
        }
        return callback(result);
      },
    },
    {
      data: 'department',
      type: 'refTreeWithInput', // 树参照
      refConfig: {
        isThreeBar: true, // 是否出现三道杠
        treeData: refTreeData,
      },
      refSource: (value, type, callback) => { // 表格简单搜索
        console.log('refSearch--tree', value, type);
        const result = { treeData: refTreeData };
        if (value) {
          result.treeData = refTreeSearch;
        }
        return callback(result);
      },
      refOnChange: (refData, rowData, rowNum) => {  // 参照选中数据,表格行数据,表格行下标
        console.log('refData, rowData, rowNum', refData, rowData, rowNum);
      },
    },
    {
      data: 'department_staff',
      type: 'refTreeTableWithInput', // 树表参照
      refConfig: {
        isThreeBar: true, // 是否出现三道杠
        columnsData: refTreeTableData.columnsData,
      },

      refSource: (value, type, callback) => {
        const { treeData: searchTree, tableData: searchTable } = refTreeTableSearch;
        const result = {
          tableData: refTreeTableData.tableData,
          treeData: refTreeTableData.treeData,
          page: refTreeTableData.page,
        };

        if (value && type === 'tree') { // 树搜索
          result.tableData = [];
          result.treeData = searchTree;
        }

        if (value && type === 'table') { // 表格搜索
          result.tableData = searchTable;
        }

        return callback(result);
      },
    },
    {
      data: 'department_staff_transfer',
      type: 'refTreeTransferWithInput', // 树穿梭参照
      refConfig: {
        isThreeBar: true, // 是否出现三道杠
        displayField: '{refname}-{refcode}-jaja',
        valueField: 'refcode',
      },
      refSource: (value, type, callback) => {
        const result = {
          treeData: refTreeTransferData.treeData,
          transferData: refTreeTransferData.transferData,
          targetKeys: [],
          columnsKey: ['title', 'refpk', 'name'],
        };

        if (value) { // 树点击选择
          result.transferData = transferTreeSelect;
        }
        return callback(result);
      },


    },

  ];

  // 表格添加行
  onInsertRowData = () => {
    this.child.onInsertRowData();
  };

  // 获取验证通过后数据
  getData = () => {
    this.child.getData((data) => {
      console.log('data', data);
    });
  };


  // 获取被格式化的数据
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };




  render() {
    const { handData } = this.state;
    console.log(this.columns);

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <Button colors="primary" onClick={this.onInsertRowData} size="sm"> 增行 </Button>
          <Button colors="primary" onClick={this.getData} size="sm"> 获取验证数据</Button>
          <Button colors="primary" onClick={this.getFormatData} size="sm">格式化数据 </Button>
        </div>


        <AcHandTable
          id="example3" // 组件id
          onRef={(ref) => { // 设置ref属性 调用子组件方法
            this.child = ref;
          }}
          colHeaders={['编码', '下拉', '表格参照', '树参照', '树表参照', '树穿梭']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          colWidths={[null, 100, 100, 100, 100, 100, 100, null]}
          rowKey="id" // 数组对象中唯一id 默认值为'id'
          width="100%"
          height="auto"
          rowStyle={(rowIndex, column, prop, value,rowData) => { // 自定义 禁止修改样式
            // console.log("rowData",rowData)
            // const data = this.child.getSourceData();
            // console.log("rowData",data[rowIndex]);
            let bgColor = '#fff';
            if (rowIndex === 1 && column === 1) {
              bgColor = '#DFE1E6';
            }
            return { 'background-color': bgColor };
          }}
        />

      </div>
    );
  }
}

export default Demo3;
