import React, { PureComponent } from 'react'
import { withFormik, Field } from 'formik'

import {
  Container,
  Input,
  Radio,
  GenderSelector,
  Button,
  ConfirmSelector,
  Textarea,
  Select,
} from '@titicaca/triple-design-system/src'

class Form extends PureComponent {
  componentDidMount() {
    this.props.validateForm()
  }
  render() {
    const {
      setFieldValue,
      values,
      handleSubmit,
      touched,
      errors,
      isSubmitting,
    } = this.props

    const disableButton = isSubmitting || Object.keys(errors).length > 0

    return (
      <Container padding={{ top: 40, left: 30, right: 30 }}>
        <form onSubmit={handleSubmit}>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="name"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name, onBlur } }) => (
                <Input
                  label="이름"
                  placeholder="이름을 입력해주세요"
                  name={name}
                  onBlur={onBlur}
                  value={values[name]}
                  onChange={(e, value) => setFieldValue(name, value)}
                  error={touched.name && errors.name}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="gender"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name, onBlur } }) => (
                <GenderSelector
                  label="성별"
                  name={name}
                  onBlur={onBlur}
                  value={values.gender}
                  onChange={(e, value) => setFieldValue(name, value)}
                  error={touched.gender && errors.gender}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Container>
              <Field
                name="passport.firstname"
                validate={(value) => !value && '필수 입력 값 입니다'}
                render={({ field: { name, onBlur } }) => (
                  <Input
                    label="영문성"
                    placeholder="HONG"
                    name={name}
                    onBlur={onBlur}
                    value={values.passport.firstname}
                    onChange={(e, value) => setFieldValue(name, value)}
                    error={
                      touched.passport &&
                      touched.passport.firstname &&
                      errors.passport &&
                      errors.passport.firstname
                    }
                  />
                )}
              />
            </Container>
            <Container>
              <Field
                name="passport.lastname"
                validate={(value) => !value && '필수 입력 값 입니다'}
                render={({ field: { name, onBlur } }) => (
                  <Input
                    label="영문이름"
                    placeholder="GILDONG"
                    value={values.passport.firstname}
                    onBlur={onBlur}
                    onChange={(e, value) => setFieldValue(name, value)}
                    error={
                      touched.passport &&
                      touched.passport.lastname &&
                      errors.passport &&
                      errors.passport.lastname
                    }
                    help="실제 이름을 입력해주세요"
                    padding={{ top: 20, bottom: 20 }}
                  />
                )}
              />
            </Container>
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="check"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name } }) => (
                <ConfirmSelector
                  name={name}
                  fillType="full"
                  placeholder="예약자와 투숙자가 다릅니다"
                  value={values.check}
                  onChange={(_, value) => setFieldValue(name, value)}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="check"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name } }) => (
                <ConfirmSelector
                  borderless
                  fillType="text"
                  name={name}
                  placeholder="예약자와 투숙자가 다릅니다"
                  value={values.check}
                  onChange={(_, value) => setFieldValue(name, value)}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="item"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name } }) => (
                <Radio
                  name={name}
                  value={values.item}
                  onChange={(_, value) => setFieldValue(name, value)}
                  options={['item1', 'item2', 'item3']}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="extra"
              render={({ field: { name, onBlur } }) => (
                <Textarea
                  label="추가정보"
                  placeholder="추가정보를 입력해주세요"
                  name={name}
                  onBlur={onBlur}
                  value={values.extra}
                  onChange={(e, value) => setFieldValue(name, value)}
                  error={touched.extra && errors.extra}
                />
              )}
            />
          </Container>
          <Container padding={{ top: 20, bottom: 20 }}>
            <Field
              name="time"
              validate={(value) => !value && '필수 입력 값 입니다'}
              render={({ field: { name, onBlur } }) => (
                <Select
                  label="예약시간"
                  placeholder="시간을 선택해주세요"
                  name={name}
                  value={values.time}
                  onChange={(e, value) => setFieldValue(name, value)}
                  onBlur={onBlur}
                  error={touched.time && errors.time}
                  options={[
                    {
                      label: '12:00',
                      value: '12:00',
                    },
                    {
                      label: '13:00',
                      value: '13:00',
                    },
                    {
                      label: '14:00',
                      value: '14:00',
                    },
                  ]}
                  help="고객님의 요청사항은 해당 호텔에 전달됩니다만 호텔 사정에 따라 필요하신 내용이 이루어지지 않을 수 있으니 많은 양해 바랍니다."
                />
              )}
            />
          </Container>
          <Button
            fluid
            borderRadius={4}
            color="blue"
            margin={{ bottom: 140 }}
            disabled={disableButton}
            onClick={!disableButton ? handleSubmit : null}
          >
            예약하기
          </Button>
        </form>
      </Container>
    )
  }
}

export default withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  validateOnChange: true,
  enableReinitialize: true,
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
