import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'

import { rhythm } from '../utils/typography'
import { isBrowser } from '../utils/runtime'

import Header from './Header'
import Footer from './Footer'

const GlobalStyle = createGlobalStyle`
  html, body, #___gatsby, [role="group"] {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f7f7f7;
  }

  #gatsby-focus-wrapper {
    height: 100%;
  }
`

const Main = styled.main`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

const Content = styled.section`
  width: 100%;
  flex: 1 0 auto;
  margin-top: 120px;
  margin-right: auto;
  margin-bottom: auto;
  margin-left: auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(3 / 4)} ${rhythm(1 / 4)};
`

export default ({ children, title }) => {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    setScrolled(window.scrollY > 40)
  }

  useEffect(() => {
    if (isBrowser()) {
      addEventListener('scroll', handleScroll)
    }
    return () => {
      if (isBrowser()) {
        removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <GlobalStyle />
      <Main>
        <Helmet title={title}>
          <meta name="description" content="William Lindner's Blog" />
        </Helmet>
        <Header height={scrolled ? 60 : 120} />
        <Content>{children}</Content>
        <Footer />
      </Main>
    </>
  )
}
