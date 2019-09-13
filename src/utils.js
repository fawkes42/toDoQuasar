export default {
  once (firebase, ref, value) {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('Dados inválidos')
      } else {
        firebase.database().ref(ref).once(value).then(snapshot => {
          resolve(snapshot)
        })
      }
    })
  },
  on (firebase, ref, value) {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('Dados inválidos')
      } else {
        firebase.database().ref(ref).on(value).then(snapshot => {
          resolve(snapshot)
        })
      }
    })
  }
}
