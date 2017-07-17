import React from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../actions/actions';
import getType from './helpers/getType';

const Form = t.form.Form;


const mapStateToProps = (state, ownProps) => {
  const attribute = state.attributes.attributeList.find(
    currentAttribute => currentAttribute.id === ownProps.id,
  );
  const { currentAttributeId, attributeList, form } = state.attributes;
  return {
    currentAttributeId,
    type: getType(attributeList, attribute),
    options: form.options,
    value: attribute,
    ref: (localForm) => { this.form = localForm; },
  };
};

const onChange = (value, dispatch, form) => {
  const validation = form.validate();
  const newValue = {
    ...value,
    ...{
      errors: validation.errors.filter(e => e.message),
    },
  };
  dispatch(updateAttribute(newValue.id, newValue));
};

const mapDispatchToProps = dispatch => ({
  onChange: (value, form) => onChange(value, dispatch, form),
});

class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    // If we are coming onto this attribute from another, revalidate.
    const { value, currentAttributeId } = this.props;
    if (Number(currentAttributeId) === value.id &&
      currentAttributeId !== prevProps.currentAttributeId) {
      this.onChange(value);
    }
  }

  onChange(value) {
    this.props.onChange(value, this.form);
  }
  render() {
    const { type, options, value} = this.props;
    return (
      <Form
        onChange={this.onChange}
        type={type}
        options={options}
        value={value}
        ref={(form) => { this.form = form; }}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
