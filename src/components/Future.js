import React from "react";
import {Breadcrumb, Col, Divider, Layout, Menu, Row} from "antd";
import {Link} from "react-router";
import echarts from 'echarts'

const {Header, Content, Footer, Sider} = Layout;


class Future extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let weather = sessionStorage.getItem('weather')
        weather = JSON.parse(weather);
        let dataArray = weather.data;
        // console.log(dataArray);
        let myChart = echarts.init(document.getElementById('dataChart'));
        myChart.setOption(
            {
                title: {
                    text: '未来一周气温变化',
                    subtext: weather.city+" , " + weather.country
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['最高气温', '最低气温']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [dataArray[0].date.substr(5),dataArray[1].date.substr(5),dataArray[2].date.substr(5),dataArray[3].date.substr(5),dataArray[4].date.substr(5),dataArray[5].date.substr(5),dataArray[6].date.substr(5),]
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name: '最高气温',
                        type: 'line',
                        data: [dataArray[0].tem1,dataArray[1].tem1,dataArray[2].tem1,dataArray[3].tem1,dataArray[4].tem1,dataArray[5].tem1,dataArray[6].tem1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        }
                    },
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [dataArray[0].tem2,dataArray[1].tem2,dataArray[2].tem2,dataArray[3].tem2,dataArray[4].tem2,dataArray[5].tem2,dataArray[6].tem2],
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5},
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        // markLine: {
                        //     data: [
                        //         {type: 'average', name: '平均值'},
                        //         [{
                        //             symbol: 'none',
                        //             x: '90%',
                        //             yAxis: 'max'
                        //         }, {
                        //             symbol: 'circle',
                        //             label: {
                        //                 position: 'start',
                        //                 formatter: '最大值'
                        //             },
                        //             type: 'max',
                        //             name: '最高点'
                        //         }]
                        //     ]
                        // }
                    }
                ]
            }
        )


    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
                        <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/search/now/city'>天气实况</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={'/search/future/city'}>未来天气</Link></Menu.Item>

                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0', color: 'white'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>future</Breadcrumb.Item>
                    </Breadcrumb>

                    <Layout style={{marginTop: '20px',width:'1000px', background: '#6e3f98'}}>
                        <Content className={'mainBar2'} style={{padding: '10px'}}>
                            <div className={'placeName'}>
                                <p><strong>未来7天天气</strong></p>
                                <div id={'dataChart'} style={{height: '350px'}}>

                                </div>
                            </div>
                        </Content>
                        <Sider className={'sideBar'}>

                        </Sider>
                    </Layout>



                </Content>
                <Footer style={{textAlign: 'center'}}>Weather Report ©2020 Created by Hammer</Footer>
            </Layout>

        );
    }

}

export default Future;