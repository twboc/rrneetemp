import resource from '../../resource/resource'
import {organisation} from '../../state/state.actions'

export const changeName =
  //@ts-ignore
  (isChangingName, setIsChangingName, setError, props, name, setName) =>
  async () => {
    try {
      if (isChangingName) return
      setIsChangingName(true)
      setError(false)
      const result = await resource.api.organisation.changeName({
        organisation_id: props.organisation.organisation_id,
        name,
      })

      if (!result.success) {
        setError(true)
        return setTimeout(() => {
          setError(false)
        }, 3000)
      }

      organisation.setName({
        ...props.organisation,
        name: result.data.name,
      })

      // In case user changes the input before the response from server
      setName(result.data.name)
    } finally {
      setIsChangingName(false)
    }
  }

