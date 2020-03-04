import gql from 'graphql-tag'
import Strapi from 'strapi-sdk-javascript/build/main'

export const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
    'https://intense-brushlands-46000.herokuapp.com' : 
    process.env.STORYBOOK_API || 'http://localhost:1337/' 

export const strapi = new Strapi(apiUrl)
export const signUp = (sameUsernames, registerRequest, setErr, setUserInfo) => {
  try {
    const { username, email, password } = registerRequest
    if(sameUsernames.length > 0) {
      throw {
        message: 'Username have been used!'
      }
    }
    return strapi
      .register(username, email, password)
      .then(res => {
        console.log(res)
        const { id, user } = res
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId', id)
        setUserInfo({
          ...user,
          isLoggedIn: true,
        })
        return user
      })
      .catch(e => setErr(e.message)) 
  } catch (e) {
    setErr(e.message)
  }
}

const USER_NAME = 'USER_NAME'
const USER_ID = 'USER_ID'
const logIn = (username, pwd, setErr) => (
  strapi
    .login(username, pwd)
    .then(res => {
      const { user } = res
      localStorage.setItem(USER_NAME, user.username)
      localStorage.setItem(USER_ID, user.id)
      return user
      // location.reload()
    })
    .catch(e => {
      setErr && setErr(e.message)
    }) 
)

export const setUserInfoFromRes = (user, setFn) => {
  const { id, username, point, rank } = user
  setFn({
    id,
    username,
    point,
    rank,
    isLoggedIn: true,
  })
}

export const logInAndSetInfo = (username, pwd, setErrFn, setFn) => {
  logIn(username, pwd, setErrFn)
    .then(user => {
      // console.log(user)
      setUserInfoFromRes(user, setFn)
    })
}




export const QUERY_SHOP_LIST = gql`
  query shopLists($userWhere: JSON) {
    shoplists {
      id
      type
      itemName
      itemPrice
      isOnlyOne
      itemImgSrc {
        url
      }
      emote {
        id
        emoteImg {
          url
        }
      }
    }
    userbuylists(where: $userWhere, sort: "itemId") {
      id
      itemId
      itemCount
    }
    useremotelists(where: $userWhere, sort: "emoteId") {
      emoteId
    }
  }`

export const UPDATE_USER_BUY_LIST = gql`
  mutation updateUserBuyList($id: ID!, $itemCount: Int!) {
    updateUserbuylist(input: {
      where: {
        id: $id
      },
      data: {
        itemCount: $itemCount
      }
    }) {
      userbuylist {
        id
        itemId
        itemCount
      }
    }
  }`

export const CREATE_USER_BUY_LIST = gql`
  mutation createUserBuyList($data: UserbuylistInput) {
    createUserbuylist(input: {
      data: $data
    }) {
      userbuylist {
        username
        id
        itemId
        itemCount
      }
    }
  }`

export const QUERY_USER = gql`
  query QUERY_USER($id: ID!) {
    user(id: $id) {
      username
      point
      rank
    }
  }`

export const QUERY_USERS = gql`
  query QUERY_USERS($userWhere: JSON) {
    users(where: $userWhere) {
      id
      username
      point
      rank
    }
  }`

export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $point: Int) {
    updateUser(input: {
      where: {
        id: $id
      },
      data: {
        point: $point
      }
    }) {
      user {
        id
        username
        point
        rank
      }
    }
  }`

export const QUERY_USER_EMOTES = gql`
  query QUERY_USER_EMOTES($userWhere: JSON) {
    useremotelists(where: $userWhere, sort: "emoteId") {
      emoteId
    }
    emotes {
      id
      emoteName
      emoteImg {
        url
      }
    }
  }`

export const CREATE_USER_EMOTE_LIST = gql`
  mutation CREATE_USER_EMOTE_LIST($data: UseremotelistInput) {
    createUseremotelist(input: {
      data: $data
    }) {
      useremotelist {
        emoteId
      }
    }
  }`

//shop list

export const updateUserBuyListFn = 
  (updateUserBuyListMutation, cancelFn, { userbuylistId, itemCount, numCount }) => {
    return updateUserBuyListMutation({
      variables: {
        id: userbuylistId,
        itemCount: itemCount + numCount,
      }
    }).then(() => cancelFn())
  }

export const createUserBuyListFn = 
  (createUserBuyListMutation, createUserEmoteListMutation, cancelFn, {
    username, itemId, numCount, emoteId
  }) => {
    return createUserBuyListMutation({
      variables: {
        data: {
          username,
          itemId,
          itemCount: numCount,
        }
      }
    }).then(res => {
      if(emoteId) {
        createUserEmoteListMutation({
          variables: {
            data: {
              username,
              emoteId,
            }
          }
        })
      } return res
    }).then(() => cancelFn())
  }

export const updateUserFn = (updateUserMutation, setUserInfoFn, {
  userInfo, remainPoints
}) => {
  return updateUserMutation({
    variables: {
      id: userInfo.id,
      point: remainPoints
    }
  }).then(res => {
    // console.log(res)
    setUserInfoFn({
      ...userInfo,
      point: res.data.updateUser.user.point
    })
  })
}