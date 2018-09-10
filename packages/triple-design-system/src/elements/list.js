import React from 'react'
import styled from 'styled-components'
import Icon from './icon'

const List = styled.ul`
  padding: 0;
`

const ListIcon = styled(Icon)`
  display: table-cell;
  padding-right: 10px;
`

const ListItem = styled.li`
  clear: both;
  position: relative;
  list-style-type: none;
`

const ListContent = styled.div`
  display: table-cell;
`

const ListActions = styled.div`
  float: right;
`

const ListActionCell = styled.div`
  height: 40px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const ListActionLabel = styled.div`
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 7px;
  padding-left: 17px;
  padding-right: 17px;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  border-radius: 17px;
  background-color: #fafafa;
`

function ListAction({ children }) {
  return (
    <ListActions>
      <ListActionCell>
        <ListActionLabel>{children}</ListActionLabel>
      </ListActionCell>
    </ListActions>
  )
}

List.Item = ListItem
List.Icon = ListIcon
List.Content = ListContent
List.Action = ListAction

export default List
