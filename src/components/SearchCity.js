import React from "react";
import {Breadcrumb, Divider, Row, Col, Layout, Menu, Space} from "antd";
import {Link} from "react-router";
import axios from 'axios'

import './searchCity.css'
import Tips from "./Tips";

const {Header, Content, Footer, Sider} = Layout;


class SearchCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curHour: new Date().getHours(),
            className: null
        }
    }

    componentDidMount() {
        let {curHour} = this.state;
        if (curHour > 12) {
            this.refs.p1.innerHTML = '--';
            this.refs.wea1.innerHTML = '--';
            this.refs.win1.innerHTML = '--';
        }
        if (curHour > 18) {
            this.refs.p2.innerHTML = '--';
            this.refs.wea2.innerHTML = '--';
            this.refs.win2.innerHTML = '--';
        }
        if (curHour > 24) {
            this.refs.p3.innerHTML = '--';
            this.refs.wea3.innerHTML = '--';
            this.refs.win3.innerHTML = '--';
        }
        // if (curHour > 0 && curHour < 8) {
        //     this.refs.p4.innerHTML = '--';
        //     this.refs.wea4.innerHTML = '--';
        //     this.refs.win4.innerHTML = '--';
        // }
        this.writeFile();

    }


    changeClassName = () => {
        let {curHour} = this.state;

        if (8 <= curHour && curHour <= 12) {
            this.state.className = 'am';
        } else if (12 < curHour && curHour <= 18) {
            this.state.className = 'pm';

        } else if (18 < curHour && curHour <= 24) {
            this.state.className = 'evening';
        } else {
            this.state.className = 'night';

        }
        // console.log(this.state)
    }
    writeFile = () => {
        let Info = JSON.parse(sessionStorage.getItem('weather'));
        let obj = Info.data[0];
        obj.city_name = Info.city;
        obj.locatedCity = sessionStorage.getItem('locatedCity')
        let s = JSON.stringify(obj);
        axios({
            url: 'http://localhost:8080',
            method: 'get',
            params: {s}
        })
    }

    render() {
        let {curHour} = this.state;
        this.changeClassName();
        let {className} = this.state;
        let weather = JSON.parse(sessionStorage.getItem('weather'));


        let count = 0;
        for (let item of weather.data[0].hours) {
            if (item.hours.indexOf(curHour) !== -1) {
                break;
            }
            count++;
        }
        // console.log(count);
        let obj = {};
        let j = 0;
        for (let i = count + 1; i <= 5 + count; i++) {
            obj[j++] = weather.data[0].hours[i];
        }
        // console.log(obj)
        let dayReport = weather.data;
        // console.log(dayReport)
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/search/now/city'>天气实况</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={'/search/future/city'}>未来天气</Link></Menu.Item>

                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0', color: 'white'}}>

                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>now</Breadcrumb.Item>
                    </Breadcrumb>

                    {/*mainBar1*/}
                    <Layout className={'layout'}>
                        <Content className={'mainBar'} style={{padding: '10px'}}>
                            <div className={'div1'}>{weather.city},{weather.country}</div>
                            <div className={'pic'}>
                                <img id={'wea_pic'} src={require(`../img/weather_api/${weather.data[0].wea_img}.png`)}
                                     alt={`${weather.data[0].wea}`}/>
                                <p>{weather.data[0].tem1}℃/{weather.data[0].tem2}℃</p>
                            </div>
                            <div className={'div2'}>{'更新时间：' + weather.update_time}</div>
                            <div className={'div3'}>{weather.data[0].tem}℃</div>

                            <div className={'div1'}>{weather.data[0].wea}</div>

                        </Content>
                        <Sider className={'sideBar'}>
                            <div className={'list'}>
                                <h3>空气质量指数</h3>
                                <p>{weather.data[0].air} {weather.data[0].air_level}</p>
                            </div>
                            <div className={'list'}>
                                <h3>健康与活动</h3>
                                <p>{weather.data[0].air_tips}</p>
                            </div>
                        </Sider>
                    </Layout>
                    <Layout style={{background: '#6e3f98'}}>
                        <Content className={'mainBar2'} style={{padding: '10px'}}>
                            <div className={'placeName'}>
                                <p><strong> {weather.city},{weather.country} 今日天气预报</strong></p>
                            </div>
                            <Row>
                                <Col span={5}>
                                    <div className={'hourWeather'}>
                                        <p className={className === 'am' ? 'am timeOneDay' : 'timeOneDay'}>上午</p>
                                        <p ref={'p1'}
                                           className={className === 'am' ? 'am tem2' : 'tem2'}>{weather.data[0].hours[0].tem}℃</p>
                                        <p ref={'wea1'} className={'timeOneDay'}>{weather.data[0].hours[0].wea}</p>
                                        <p ref={'win1'}>{weather.data[0].hours[0].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={5}>
                                    <div className={'hourWeather'}>
                                        <p className={className === 'pm' ? 'pm timeOneDay' : 'timeOneDay'}>下午</p>
                                        <p ref={'p2'}
                                           className={className === 'pm' ? 'pm tem2' : 'tem2'}>{weather.data[0].hours[2].tem}℃</p>
                                        <p ref={'wea2'} className={'timeOneDay'}>{weather.data[0].hours[2].wea}</p>
                                        <p ref={'win2'}>{weather.data[0].hours[2].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={5}>
                                    <div className={'hourWeather'}>
                                        <p className={className === 'evening' ? 'evening timeOneDay' : 'timeOneDay'}>晚上</p>
                                        <p ref={'p3'}
                                           className={className === 'evening' ? 'evening tem2' : 'tem2'}>{weather.data[0].hours[4].tem}℃</p>
                                        <p ref={'wea3'} className={'timeOneDay'}>{weather.data[0].hours[4].wea}</p>
                                        <p ref={'win3'}>{weather.data[0].hours[4].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={5}>
                                    <div className={'hourWeather'}>
                                        <p className={className === 'night' ? 'night timeOneDay' : 'timeOneDay'}>夜间</p>
                                        <p ref={'p4'}
                                           className={className === 'night' ? 'night tem2' : 'tem2'}>{weather.data[0].hours[6].tem}℃</p>
                                        <p ref={'wea4'} className={'timeOneDay'}>{weather.data[0].hours[6].wea}</p>
                                        <p ref={'win4'}>{weather.data[0].hours[6].win}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                        <Sider className={'sideBar'}>
                            <div>
                                {/*<Tips weather={weather}/>*/}
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[0].title}</h3>
                                    <p>{weather.data[0].index[0].level}</p>
                                    <p>{weather.data[0].index[0].desc}</p>
                                </div>
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[1].title}</h3>
                                    <p>{weather.data[0].index[1].level}</p>
                                    <p>{weather.data[0].index[1].desc}</p>
                                </div>

                            </div>
                        </Sider>
                    </Layout>
                    <Layout style={{marginTop: '20px', background: '#6e3f98'}}>
                        <Content className={'mainBar2'} style={{padding: '10px'}}>
                            <div className={'placeName'}>
                                <p><strong>每小时预报</strong></p>
                            </div>
                            <Row>
                                <Col style={{marginLeft: '35px'}} span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}><strong>现在</strong></p>
                                        <p className={'tem2 now'}><strong>{weather.data[0].hours[count].tem}℃</strong>
                                        </p>
                                        <p className={'timeOneDay'}>{weather.data[0].hours[count].wea}</p>
                                        <p>{weather.data[0].hours[count].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>{obj[0].hours}</p>
                                        <p className={'tem2'}>{obj[0].tem}℃</p>
                                        <p className={'timeOneDay'}>{obj[0].wea}</p>
                                        <p>{obj[0].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>{obj[1].hours}</p>
                                        <p className={'tem2'}>{obj[1].tem}℃</p>
                                        <p className={'timeOneDay'}>{obj[1].wea}</p>
                                        <p>{obj[1].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>{obj[2].hours}</p>
                                        <p className={'tem2'}>{obj[2].tem}℃</p>
                                        <p className={'timeOneDay'}>{obj[2].wea}</p>
                                        <p>{obj[2].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>{obj[3].hours}</p>
                                        <p className={'tem2'}>{obj[3].tem}℃</p>
                                        <p className={'timeOneDay'}>{obj[3].wea}</p>
                                        <p>{obj[3].win}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>{obj[4].hours}</p>
                                        <p className={'tem2'}>{obj[4].tem}℃</p>
                                        <p className={'timeOneDay'}>{obj[4].wea}</p>
                                        <p>{obj[4].win}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                        <Sider className={'sideBar'}>
                            <div>
                                {/*<Tips weather={weather}/>*/}
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[2].title}</h3>
                                    <p>{weather.data[0].index[2].level}</p>
                                    <p>{weather.data[0].index[2].desc}</p>
                                </div>
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[3].title}</h3>
                                    <p>{weather.data[0].index[3].level}</p>
                                    <p>{weather.data[0].index[3].desc}</p>
                                </div>

                            </div>

                        </Sider>

                    </Layout>
                    <Layout className={'layout'} style={{marginTop: '20px', background: '#6e3f98', height: '520px'}}>
                        <Content className={'mainBar2'} style={{padding: '10px'}}>
                            <div style={{float: 'left', marginTop: '20px', marginLeft: '20px'}}>
                                <div className={'placeName'}>
                                    <p className={'tempOneDay'}><strong>{weather.city} 今日天气</strong></p>
                                </div>
                                <div style={{fontSize: '30px'}}>{weather.data[0].tem}℃</div>
                            </div>
                            <div style={{float: 'right', marginTop: '10px', marginRight: '40px'}}>
                                <div style={{paddingLeft: '70px'}}>
                                    <img id={'wea_pic'}
                                         src={require(`../img/weather_api/${weather.data[0].wea_img}.png`)}
                                         alt={`${weather.data[0].wea}`}/>
                                </div>
                                <div>
                                    <img style={{float: 'left'}} src={require(`../img/sunrise.png`)} alt={'1'}/>
                                    <p className={'img1Val'} style={{float: 'left'}}>{weather.data[0].sunrise}</p>
                                    <img style={{float: 'left'}} src={require(`../img/sunset.png`)} alt={'1'}/>
                                    <p className={'img1Val'}
                                       style={{float: 'left', marginRight: '20px'}}>{weather.data[0].sunset}</p>
                                </div>
                            </div>
                            <div style={{float: 'left', width: '100%'}}>
                                <div style={{width: '50%', float: 'left'}}>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/tem.png`)} alt={'1'}/>
                                    <p className={'img1Des'}> 高/低</p>
                                    <p className={'img1Val'}>{weather.data[0].tem1}°/{weather.data[0].tem2}°</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/humidity.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>湿度</p>
                                    <p className={'img1Val'}>{weather.data[0].humidity}</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/pressure.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>气压</p>
                                    <p className={'img1Val'}>{weather.data[0].pressure}毫巴</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/visibility.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>能见度</p>
                                    <p className={'img1Val'}>{weather.data[0].visibility}</p>
                                </div>
                                <div style={{width: '50%', float: 'left'}}>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/wind.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>大风</p>
                                    <p className={'img1Val'}>{weather.data[0].win_meter}</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/sun.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>紫外线</p>
                                    <p className={'img1Val'}>{weather.data[0].index[0].level}</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/air.png`)} alt={'1'}/>
                                    <p className={'img1Des'}>AQI</p>
                                    <p className={'img1Val'}>{weather.aqi.air?weather.aqi.air+ " " + weather.aqi.air_level:'暂缺    ' }</p>
                                    <Divider/>
                                    <img className={'img1'} src={require(`../img/pm25.jpg`)} alt={'1'}/>
                                    <p className={'img1Des'}>PM2.5</p>
                                    <p className={'img1Val'}>{weather.aqi.pm25?weather.aqi.pm25:'暂缺'}</p>
                                </div>
                            </div>
                        </Content>
                        <Sider className={'sideBar'}>

                        </Sider>

                    </Layout>

                    <Layout style={{marginTop: '20px', background: '#6e3f98', height: '350px'}}>
                        <Content className={'mainBar2'} style={{padding: '10px'}}>
                            <div className={'placeName'}>
                                <p><strong>每日预报</strong></p>
                            </div>
                            <Row>
                                <Col style={{marginLeft: '35px'}} span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}><strong>今天</strong></p>
                                        <p className={'tem2 now'}><strong>{dayReport[0].tem1}℃</strong></p>
                                        <p className={'tem1 now'}><strong>{dayReport[0].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[0].wea_img}.png`)}
                                             alt={`${dayReport[0].wea}`}/>
                                        <p>{dayReport[0].win[0]}</p>
                                        <p>{dayReport[0].win[1]}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>
                                            <strong>{"周" + dayReport[1].week.split('期')[1] + dayReport[1].day.split('日')[0]}</strong>
                                        </p>
                                        <p className={'tem2'}><strong>{dayReport[1].tem1}℃</strong></p>
                                        <p className={'tem1'}><strong>{dayReport[1].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[1].wea_img}.png`)}
                                             alt={`${dayReport[1].wea}`}/>
                                        <p>{dayReport[1].win[0]}</p>
                                        <p>{dayReport[1].win[1]}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>
                                            <strong>{"周" + dayReport[2].week.split('期')[1] + dayReport[2].day.split('日')[0]}</strong>
                                        </p>
                                        <p className={'tem2'}><strong>{dayReport[2].tem1}℃</strong></p>
                                        <p className={'tem1'}><strong>{dayReport[2].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[2].wea_img}.png`)}
                                             alt={`${dayReport[2].wea}`}/>
                                        <p>{dayReport[2].win[0]}</p>
                                        <p>{dayReport[2].win[1]}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>
                                            <strong>{"周" + dayReport[3].week.split('期')[1] + dayReport[3].day.split('日')[0]}</strong>
                                        </p>
                                        <p className={'tem2'}><strong>{dayReport[3].tem1}℃</strong></p>
                                        <p className={'tem1'}><strong>{dayReport[3].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[3].wea_img}.png`)}
                                             alt={`${dayReport[3].wea}`}/>
                                        <p>{dayReport[3].win[0]}</p>
                                        <p>{dayReport[3].win[1]}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>
                                            <strong>{"周" + dayReport[4].week.split('期')[1] + dayReport[4].day.split('日')[0]}</strong>
                                        </p>
                                        <p className={'tem2'}><strong>{dayReport[4].tem1}℃</strong></p>
                                        <p className={'tem1'}><strong>{dayReport[4].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[4].wea_img}.png`)}
                                             alt={`${dayReport[4].wea}`}/>
                                        <p>{dayReport[4].win[0]}</p>
                                        <p>{dayReport[4].win[1]}</p>
                                    </div>
                                </Col>
                                <Divider className={'divider'} dashed={true} type="vertical"/>
                                <Col span={3}>
                                    <div className={'hourWeather'}>
                                        <p className={'timeOneDay'}>
                                            <strong>{"周" + dayReport[5].week.split('期')[1] + dayReport[5].day.split('日')[0]}</strong>
                                        </p>
                                        <p className={'tem2'}><strong>{dayReport[5].tem1}℃</strong></p>
                                        <p className={'tem1'}><strong>{dayReport[5].tem2}℃</strong></p>
                                        <img className={'pic2'}
                                             src={require(`../img/weather_api/${dayReport[5].wea_img}.png`)}
                                             alt={`${dayReport[5].wea}`}/>
                                        <p>{dayReport[5].win[0]}</p>
                                        <p>{dayReport[5].win[1]}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                        <Sider className={'sideBar'}>
                            <div>
                                {/*<Tips weather={weather}/>*/}
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[4].title}</h3>
                                    <p>{weather.data[0].index[4].level}</p>
                                    <p>{weather.data[0].index[4].desc}</p>
                                </div>
                                <div className={'list'}>
                                    <h3>{weather.data[0].index[5].title}</h3>
                                    <p>{weather.data[0].index[5].level}</p>
                                    <p>{weather.data[0].index[5].desc}</p>
                                </div>

                            </div>

                        </Sider>

                    </Layout>

                </Content>
                <Footer style={{textAlign: 'center'}}>Weather Report ©2020 Created by Hammer</Footer>
            </Layout>

        );
    }

}

export default SearchCity;