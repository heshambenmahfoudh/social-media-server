export const createErr = async (status, message) => {
  const err = new Error()
  err.status = status
  err.message = message
  return err
}
export const SUCCESS = 'success'
export const FAIL = 'fail'
export const ERR = 'err'
