import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import {Button,Con,Col,Tile,Icon,Tooltip} from 'tinper-bee';
require('./style.scss');

const propTypes = {
    menus: PropTypes.array,
    onChange: PropTypes.func
};
const defaultProps = {
    menus: [],
    onChange: () => {},
};
class Tab extends Component {
    constructor(props) {
        super(props);
        var value = typeof sessionStorage['tabNotice']=='undefined'?true:sessionStorage['tabNotice'];

        let initialMenus = [];
        if ('menus' in props) {
            initialMenus = props.menus || [];
        }

        this.state = {
            tabNotice:JSON.parse(value),
            moreMenuList:[],
            tabsMore: false, //是否显示更多
            current: props.activeKey || '', //当前选中的key
            menus: initialMenus || [], //显示的多页签
            tabNum:0, //多页签数量
        };

        this.setCurrent = this.setCurrent.bind(this);

        this.del = this.del.bind(this);
        window.closeWin = this.del;
    }

    componentWillReceiveProps(nextProps){
        const { menus, activeKey } = this.props;
        if(nextProps.menus !== menus){
            this.setState({
                menus: nextProps.menus
            })
        }
        if(nextProps.activeKey !== activeKey){
            this.setState({
                current: nextProps.activeKey
            })
        }
    }
    
    /**
     * 设置激活页签
     * @param id 点击的页签的 id
     * @param tab 点击的页签的信息
     * @param type 0 为点击普通页签，1 为点击更多列表里的页签
     */
    setCurrent (id, tab) {
        let morelist = this.state.moreMenuList;
        let menuProp = this.props.menus;
        const { onChange } = this.props;
        let moreFlag = false;
        let obj = {};
        if(morelist.length > 0) {
          for (var i = 0; i < morelist.length; i++) {
            if(morelist[i].id === id) {
                moreFlag = true;
                obj = morelist[i];
                break;
            } else {
                moreFlag = false;
            }
          }
          if(moreFlag) {
            for (var i = 0; i < menuProp.length; i++) {
                if(menuProp[i].id === id) {
                    menuProp.splice(i,1);
                }
            }
            menuProp.splice(1,0,obj);
          }
        }
        this.setState({
          current: id,
          menus: menuProp
        })
        onChange && onChange(menuProp, tab);
        sessionStorage['current'] = JSON.stringify({
            current:id
        });
    }

    del (id, tab) {
        const {menus,current} = this.state;
        const { onChange } = this.props;
        var menuCloned = JSON.parse(JSON.stringify(menus));

        var num = 0;
        for(var i=0;i<menuCloned.length;i++){
            if(id==menuCloned[i].id){
                menuCloned.splice(i,1);
                num = i-1;
            }
        }

        var data = {
            menus:menuCloned
        }

        //删除选中的tab时
        if(current==id){
            data.current=menuCloned[num].id;
            data.router=menuCloned[num].router;
        }

        data.tabNum = menuCloned.length;

        sessionStorage['tabs'] = JSON.stringify(data.menus);
        sessionStorage['current'] = JSON.stringify({
            current:data.current
        });
        this.setState({
            menus: data.menus,
            tabNum: data.tabNum
        })
        onChange && onChange(data.menus, tab);
        return menuCloned;
    }

    notice() {
        const {tabNotice} = this.props;
        var value = tabNotice

        sessionStorage['tabNotice'] = !value;

        actions.app.updateState({
            tabNotice:!value
        })
    }
    componentDidUpdate(){
        // this.tabNotice();
    }
    tabNotice (){
        const {menus} = this.props;
        if(menus.length>=3) {
            var dom = ReactDOM.findDOMNode(this.refs['tabNotice']);
            if(dom){
                dom.style.display = '';
            }
            setTimeout(function () {
                if(dom){
                    dom.style.display = 'none';
                }
            },2000)
        }
    }
    // 页签更多的点击事件
    tabsMoreClick() {
      const {tabsMore} = this.state;
      this.setState({
        tabsMore: !tabsMore
      })
    }
    //控制头部是否显示
    showHeaderClick() {
      const {showHeader} = this.props;
      actions.app.updateState({
          showHeader: !showHeader
      })
    }
    render() {

        var self = this;
        let { menus, tabNum, tabsMore, current } = this.state;
        const {showNotice,tabNotice,showHeader,intl,sideShowPosition,leftExpanded} = this.props;
        // let {tabsMore} = this.props;
        const moremenu=[];
        this.state.moreMenuList = [];
        let tabsMoreCls = tabsMore? 'show' : 'hide';
        // console.log(menus);
        return (

            <div id="portalTabs" className={["tabs ui-tabs-num-"+tabNum ,sideShowPosition==="left"?"tabs-show-left":'',leftExpanded?"tabs-show-left-expand":''].join(" ")}>
                <div className="tabs-list-box">
                    {/*<span className="tabs-list-home">*/}
                    {/*<i className="qy-iconfont icon-tubiao-shouye"></i>*/}
                    {/*</span>*/}

                    <ul className="tabs-list">
                        {
                            menus.map(function (item,index) {
                                var delIcon = index==0?'':(<Icon type="uf-close-c" onClick={self.del.bind(this,item.id, item)} key={item.router}></Icon>)

                                var homeIcon = index==0?<Icon type="uf-home"></Icon>:item.title;
                                var ishome = index==0? "home-item" : "";

                                var selected = current==item.id?'selected':'';
                                var liDom;
                                if(index >10) {
                                  moremenu.push(item);
                                  self.state.moreMenuList = moremenu;

                                } else {
                                  liDom = <li key={item.id} className={`${selected} ${ishome}`}>
                                      <a onClick={self.setCurrent.bind(this,item.id, item, 0)} href="javascript:;" title={item.title}>
                                          {homeIcon}
                                      </a>
                                      {delIcon}
                                  </li>
                                }

                                return liDom

                            })
                        }
                        {
                          menus.length>11? <li className="tabs-more" onClick={self.tabsMoreClick.bind(this)}><a href="javascript:;">{"更多"}</a>{tabsMore?<i className="uf uf-gridcaretarrowup tabs-up"></i>:<i className="uf uf-treearrow-down tabs-up"></i>}<ul className={`tabs-more-list tabs-more-list-${tabsMoreCls}`}>
                          {
                            moremenu.map(function(item1,index1){
                              return (
                                <li key={item1.id}><a onClick={self.setCurrent.bind(this, item1.id, item1, 1)} href="javascript:;" title={item1.title}>
                                    {item1.title}
                                </a></li>
                              )
                            })
                          }
                          </ul></li>:''
                        }
                    </ul>
                    {/* {
                      <div className="tabs-header-show" onClick={self.showHeaderClick.bind(this)}>{!showHeader?<i className="uf uf-gridcaretarrowup"></i>:<i className="uf uf-treearrow-down"></i>}</div>
                    } */}


                </div>

            </div>

        )
    }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;
export default Tab;
