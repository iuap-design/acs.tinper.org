import React,{Component} from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import HeaderLeft from './HeaderLeft';
import HeaderCenter from './HeaderCenter';
import HeaderRight from './HeaderRight';

const propTypes = {
  showHeader: PropTypes.bool, //是否显示导航栏
};

const defaultProps = {
  showHeader: true,
  clsPrefix: 'ac-navbar',
};

class AcNavbar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded:false,
            openKeys:[],
            curentOpenKeys: [],
            maxed:false,
            unreadMsg:0,
            svgWidth: 22,
            svgHeight: 26,
            sideBarShow: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
        this.addFullScreenChangeEvent();
    }

    handleClick(e,reload) {
        //判断是否点击子菜单,1:当前子菜单，2:2级别子菜单。。。
        let {menus,current,intl} = this.props;

        let self = this;

        function getDOm() {
            let tar = e.target || e.domEvent.target;
        if (!tar.tagName || tar.tagName !== 'A') {
            tar = tar.closest('a');
        }
            if(tar.getAttribute('value')){
                return tar;
            }
            else if(tar.parentElement.getAttribute('value')){
                tar.parentElement
            }
            else {
                return tar.parentElement.parentElement
            }
        }

        let tar = getDOm();


        if(!tar){
            return false;
        }

        let value = tar.getAttribute('value');


        let data = {
            current: value,
            showNotice:0,
            reload:0
        };

        if(typeof value == 'undefined'||value==null){
            return false;
        }

        if(value=='logout'){
            return false;
        }


        let dom = tar;
        let title = dom.getAttribute('name');
        let router =  dom.getAttribute('href');



        let options = {
            title:title,
            router:router,
            id:value
        };


        let menu = menus;


        //点击已经选中的节点时
        if(value==current){
            var url = location.hash;
            //window.router.dispatch('on', url.replace('#',''));
        }
        else {
            if(typeof dom!="undefined"&&dom.getAttribute('target')=='_blank'){
                return false;
            }
            else {
                var menuObj = JSON.parse(JSON.stringify(menu));


                if(menuObj.length==11&&JSON.stringify(menu).indexOf('"id":"'+options.id+'"')==-1&&menu.length!=0) {
                    actions.app.updateState({
                        showNotice:1
                    });
                    // Warning(  intl.formatMessage({id: 'tabs.sidebar.maxnums',defaultMessage:"抱歉，最多展示10个页签！"}));
                    return false;
                }
                else if(JSON.stringify(menu).indexOf('"id":"'+options.id+'"')!=-1){
                    data = {
                        current: value,
                        showNotice:0,
                        reload:reload?1:0,
                        currentRouter:reload?decodeURIComponent(decodeURIComponent(router.replace('#\/ifr\/',''))):''
                    };
                }
                actions.app.updateState(data);
            }
        }
    }
    formmaterUrl(item) {
        var uri = " ";
        if (item.urltype === 'url') {
            var target=item.openview=="newpage"?"_blank":"";
            if(target){
                // uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
                uri = item.location;
            }else{
                uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
            }
            return  uri;
        } else if (item.urltype === 'plugin') {
            uri = item.id ? ('#/' + item.id) : "#/index_plugin";

            uri = `${GROBAL_HTTP_CTX}/`+encodeURIComponent(encodeURIComponent('index-view.html'+uri));
            return  uri;
        } else if (item.urltype === 'view') {
            uri = item.location;
            uri= uri.replace("#", "/");

            if(uri[0]=='/'){
                uri = "/sidebar"+uri;
            }else{
                uri = "/sidebar/"+uri;
            }
            // window.addRouter(uri);
            // return  "#"+uri;

            return `${GROBAL_HTTP_CTX}/`+'index-view.html#'+uri;
        }else if(item.urltype == undefined){
            item.location = '404';
            return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
        }
        else {
            return item.location;
        }
    }

    handleDefault(e,isDefault) {
        isDefault = (isDefault=="_blank")?false:true;
        if(window.isOpenTab&&isDefault){
            //dom.href = 'javascript:;'
            e.preventDefault();
        }
    }
    addFullScreenChangeEvent =()=>{
        let de  = document.documentElement;
        if (de.requestFullscreen) {
            document.addEventListener('fullscreenchange', ()=>this.fulllscreenChange());
        } else if (de.mozRequestFullScreen) {
            document.addEventListener('mozfullscreenchange', ()=>this.fulllscreenChange());
        } else if (de.webkitRequestFullScreen) {
            document.addEventListener('webkitfullscreenchange', ()=>this.fulllscreenChange());
        }else if(de.msRequestFullscreen){
            document.addEventListener('MSFullscreenChange', ()=>this.fulllscreenChange());
        }
    }
    fulllscreenChange = ()=>{
      let {maxed} = this.state;
      this.setState({
        maxed:!maxed
      })
    }
    maxfunc(e){
      // debugger;
        let de  = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }else if(de.msRequestFullscreen){
            de.msRequestFullscreen()
        }
    }
    minifunc(e){
      // debugger;
        let de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }else if(de.msExitFullscreen){
            de.msExitFullscreen()
        }

    }
    svgClick = () => {
        let {sideBarShow} = this.state;
        this.setState({
            sideBarShow: !sideBarShow
        })
        this.props.onSidebarClick && this.props.onSidebarClick(!sideBarShow);
    }

    render (){
        let self = this;
        let {maxed,sideBarShow} = self.state;
        let {
            clsPrefix,
            expanded,
            menus,
            intl,
            showHeader,
            sideShowPosition,
            leftExpanded,
            searchInputProps,
            onInputSearch
        } = this.props;
        let headerRightOper = {
          maxfunc: self.maxfunc,
          minifunc: self.minifunc,
          handleDefault: self.handleDefault,
          handleClick: self.handleClick,
        }
        var UserMenuObj = {
            formmaterUrl:self.formmaterUrl,
            handleClick:self.handleClick,
            handleDefault:self.handleDefault,
            intl:intl
        };
        let classes = classnames({
            "header": true,
            'header-hide': !showHeader,
            'header-show': showHeader,
            "header-show-left": sideShowPosition==='left',
            "header-show-left-expand": leftExpanded
        })
        return (
            <div className={clsPrefix}>
                <nav className={classes}>
                    <HeaderLeft 
                    placeholder={"应用查询"} 
                    svgClick={this.svgClick}
                    sideBarShow={sideBarShow}
                    searchInputProps={searchInputProps}
                    onInputSearch={onInputSearch}
                    />
                    <HeaderCenter/>
                    <HeaderRight 
                    maxed={maxed}
                    headerRightOper={headerRightOper} 
                    handleClick={self.handleClick.bind(this)} 
                    intl={intl} 
                    unreadMsg= {this.state.unreadMsg} 
                    UserMenuObj={UserMenuObj}
                    />
                </nav>
            </div>
        )
    }
}
AcNavbar.propTypes = propTypes;
AcNavbar.defaultProps = defaultProps;

export default AcNavbar;
