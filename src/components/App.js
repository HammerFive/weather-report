import React from "react";
import {Layout, Row, Col, Menu, Breadcrumb} from 'antd';
import {Link} from 'react-router'
import {Input} from 'antd';
import axios from 'axios'
import {AudioOutlined} from '@ant-design/icons';
import AMapLoader from '@amap/amap-jsapi-loader';

const {Header, Content, Footer} = Layout;

const {Search} = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city_name: null,
            weather:null
        }
        this.onComplete = this.onComplete.bind(this);
    }

    onComplete(data) {
        let {city_name} = this.state;
        // data是具体的定位信息
        // console.log(data.addressComponent.city)
        var cityName = data.addressComponent.city

        var city = cityName.split('市')[0];
        // alert(city)
        if (city !== '') {
            this.setState({
                city_name: city
            })
            // console.log(this.state);
        }
    }

    componentDidMount() {
        let com = this;
        AMapLoader.load({
            "key": "6c98df3b4ca361b05fcbb5d687915862",   // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": []  //插件列表
        }).then((AMap) => {
            let map = new AMap.Map('container');
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB',

                })
                map.addControl(geolocation);
                // geolocation.getCurrentPosition()
                // AMap.event.addListener(geolocation, 'complete', onComplete)
                // AMap.event.addListener(geolocation, 'error', onError)
                geolocation.getCurrentPosition(function (status, result) {
                    if (status === 'complete') {
                        com.onComplete(result)
                    } else {
                        onError(result)
                    }
                });


                function onError(data) {
                    // 定位出错
                }
            })
        }).catch(e => {
            console.log(e);
        })
        /*  var map = new AMap.Map('container', {
              resizeEnable: true, //是否监控地图容器尺寸变化
              zoom: 11, //初始化地图层级
              // center: [116.397428, 39.90923] //初始化地图中心点
          });*/


    }


    queryInfo = (cityName) => {
        if (!cityName) {
            cityName = this.state.city_name;
        }else if (typeof cityName === 'object'){
            cityName = this.state.city_name;
        }
        // console.log(cityName)
        //cityName = cityName.split('市')[0];
        let url = 'https://www.tianqiapi.com/api?version=v9&city=' + cityName + '&appid=39796962&appsecret=6EvxoP9n';
        axios.get(url)
            .then((response)=>{
                let data = response.data;
                console.log(data);
                this.setState({
                    weather:data
                })
            })
            .catch((error)=>{
                console.log(error);

            })
        // console.log(cityName);
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <div id="container" style={{display: "none"}}/>
                    <Menu theme="dark" mode="horizontal"/>
                </Header>
                <br/>
                <h1 style={{textAlign: 'center'}}>天气预报</h1>
                <br/>
                <Content style={{padding: '0 50px'}}>
                    <br/>

                    <div style={{textAlign: 'center',padding: '50px 50px'}} className="site-layout-content">
                        <Row>
                            <Col span={12} offset={6}>
                                <Search size={"large"} placeholder="输入要查询的城市名" onSearch={this.queryInfo} enterButton/>
                                <br/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} offset={6}>
                                <Link to='/search' onClick={this.queryInfo}>查询当前城市？</Link>
                            </Col>
                        </Row>
                    </div>

                </Content>

                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }

}

export default App;