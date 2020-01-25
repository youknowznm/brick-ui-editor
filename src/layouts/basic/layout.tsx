import * as React from 'react'
import {default as c} from 'classnames'
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import {addEventListener, EventListenerHandler} from '@befe/utils'

import {ConfigProvider, Content, Footer, Header, Layout} from '@befe/brick'

import {HeaderContent} from './header-content'
import {RouteItem} from '../bootstrap'
import './style.scss'

const {Suspense} = React
const Loading = () => <div>loading...</div>

const LAYOUT_FLUID_MIN_WIDTH = 1140 // $layout-fluid-min-width

interface BasicLayoutProps {
    routes?: RouteItem[]
}

export class BasicLayout extends React.PureComponent<BasicLayoutProps> {
    scrollListener?: EventListenerHandler | null
    resizeListener?: EventListenerHandler | null
    elemHeader?: HTMLDivElement
    elemMenu?: HTMLDivElement

    state = {
        isMinWidth: false,
    }

    refHeader = (elem: HTMLDivElement) => this.elemHeader = elem
    refMenu = (elem: HTMLDivElement) => this.elemMenu = elem

    resizeHandler = () => {
        const isMinWidth = document.documentElement.getBoundingClientRect().width < LAYOUT_FLUID_MIN_WIDTH
        if (isMinWidth !== this.state.isMinWidth) {
            this.setState({
                isMinWidth,
            })
        }
    }

    renderRoute = (route: any) => {
        return <Route key={route.key} {...route}/>
    }

    renderContent() {
        const {routes} = this.props
        if (!routes) {
            return null
        }
        const firstRoutes = routes[0]
        return (
            <div className="app-content">
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Redirect exact={true} from="/" to={firstRoutes.path} />
                        {routes.map(this.renderRoute)}
                    </Switch>
                </Suspense>
            </div>
        )
    }

    componentDidMount(): void {
        // this.scrollListener = addEventListener(window, 'scroll', () => {
        //     const scrollTop = document.documentElement.scrollTop
        //     if (this.elemHeader && this.elemMenu) {
        //         const headerHeight = this.elemHeader.getBoundingClientRect().height
        //         const top = scrollTop >= headerHeight ? 0 : headerHeight - scrollTop
        //
        //         Object.assign(this.elemMenu.style, {
        //             height: `calc(100vh - ${top}px)`,
        //             top: `${top}px`,
        //         })
        //     }
        // })
        //
        this.resizeListener = addEventListener(window, 'resize', this.resizeHandler)
        this.resizeHandler()
    }

    componentWillUnmount(): void {
        if (this.scrollListener) {
            this.scrollListener.remove()
        }

        if (this.resizeListener) {
            this.resizeListener.remove()
        }
    }

    render() {
        const locale = 'zh-cn'
        const localeSet = {}

        const layoutClassName = c(
            'app-container',
            {
                ['is-min-width']: this.state.isMinWidth,
            }
        )

        return (
            <HashRouter>
                <ConfigProvider locale={locale} localeSet={localeSet}>
                    <Layout className={layoutClassName} mode="fluid">
                        <Header>
                            <HeaderContent ref={this.refHeader}/>
                        </Header>
                        <Layout>
                            <Layout>
                                <Content>{this.renderContent()}</Content>
                                <Footer>BPIT loves you</Footer>
                            </Layout>
                        </Layout>
                    </Layout>
                </ConfigProvider>
            </HashRouter>
        )
    }
}
