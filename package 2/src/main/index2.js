import React from 'react'
import { Translate } from 'react-redux-i18n'
import { BaseComponent } from '../components/BaseComponent'
import { lang } from './lang'
import * as Yup from 'yup'
import { Form } from '../components/formValidate/Form'
import { DynamicInput } from '../components/formValidate/DynamicInput'
import { encodeMessage } from '../components/formValidate/helper'

const schema = Yup.object({
  username: Yup.string().required(encodeMessage('username', 'Not empty')),
  password: Yup.string().required(encodeMessage('password', 'Not empty')),
})

export const Main = () => {
  return (
    <BaseComponent newLangData={lang}>
      <Form
        schema={schema}
        handleSubmitForm={() => {
          alert('submit')
        }}
      >
        {(form) => {
          return (
            <>
              <div>
                <label>
                  <Translate value="main.USER_NAME" />
                </label>
                <DynamicInput type="text" name="username" />
              </div>
              <div>
                <label>
                  <Translate value="main.PASSWORD" />
                </label>
                <DynamicInput type="password" name="password" />
              </div>
              <div>
                <button onClick={form.handleSubmit}>Submit</button>
              </div>
            </>
          )
        }}
      </Form>
    </BaseComponent>
  )
}
