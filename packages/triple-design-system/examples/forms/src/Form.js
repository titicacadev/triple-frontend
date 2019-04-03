import React from 'react'
import { withFormik, Field } from 'formik'
import {
  Container,
  Input,
  RadioBox,
  Button,
} from '@titicaca/triple-design-system/src'

const Form = ({
  setFieldValue,
  values,
  handleSubmit,
  touched,
  errors,
  handleChange,
}) => {
  return (
    <Container padding={{ top: 40, left: 30, right: 30 }}>
      <form onSubmit={handleSubmit}>
        <Container margin={{ bottom: 10 }}>
          <Field
            name="name"
            validate={(value) => !value && '필수 입력 값 입니다'}
            render={({ field }) => (
              <Input
                value={values.name}
                onChange={handleChange}
                label="이름"
                placeholder="이름을 입력해주세요"
                error={touched.name && errors.name}
                {...field}
              />
            )}
          />
        </Container>
        <Container margin={{ bottom: 10 }}>
          <Field
            name="gender"
            validate={(value) => !value && '필수 입력 값 입니다'}
            render={({ field }) => (
              <RadioBox
                gender
                label="성별"
                value={values.gender}
                onClick={setFieldValue}
                error={touched.gender && errors.gender}
                {...field}
              />
            )}
          />
        </Container>
        <Container>
          <Container>
            <Field
              name="passport.firstname"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field }) => (
                <Input
                  value={values.passport.firstname}
                  onChange={handleChange}
                  label="영문성"
                  placeholder="HONG"
                  error={
                    touched.passport &&
                    touched.passport.firstname &&
                    errors.passport &&
                    errors.passport.firstname
                  }
                  {...field}
                />
              )}
            />
          </Container>
          <Container>
            <Field
              name="passport.lastname"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field }) => (
                <Input
                  value={values.passport.firstname}
                  onChange={handleChange}
                  label="영문이름"
                  placeholder="GILDONG"
                  error={
                    touched.passport &&
                    touched.passport.lastname &&
                    errors.passport &&
                    errors.passport.lastname
                  }
                  {...field}
                />
              )}
            />
          </Container>
        </Container>
        <Button
          fluid
          borderRadius={4}
          color="blue"
          margin={{ bottom: 140 }}
          onClick={handleSubmit}
        >
          예약하기
        </Button>
      </form>
    </Container>
  )
}

export default withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  validateOnChange: true,
  enableReinitialize: true,
  isInitialValid: true,
  handleSubmit: async (
    values,
    { props: { onSubmit }, setErrors, setSubmitting },
  ) => {
    try {
      await onSubmit(values)

      return values
    } catch (e) {
      setErrors({ general: e.message })
    } finally {
      setSubmitting(false)
    }
  },
})(Form)
