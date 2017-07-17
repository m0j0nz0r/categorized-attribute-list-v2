import React from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../actions/actions';

const Form = t.form.Form;

const getType = (attributes, attribute) => {
  const name = t.refinement(
    t.String,
    n => !attributes.find(a => a.name === n && a.id !== attribute.id),
    );
  name.getValidationErrorMessage = (n) => {
    if (!n) {
      return 'Required';
    }
    if (attributes.find(a => a.name === n && a.id !== attribute.id)) {
      return 'Duplicated';
    }
    return '';
  };

  const description = t.maybe(t.String);

  const deviceResourceType = t.enums({ 0: 'DefaultValue' });

  const defaultValue = t.maybe(t.String);

  const dataType = t.enums({
    string: 'String',
    object: 'Object',
  });

  const format = t.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI',
  });

  let optionalFields = {};

  if (attribute.dataType === 'string') {
    switch (attribute.format) {
      case 'none':
        optionalFields = {
          enumerations: t.list(t.String),
        };
        break;
      case 'number':
        optionalFields = {
          minRange: t.refinement(t.Number, n => !Number.isNaN(Number(n)) && n < attribute.maxRange),
          maxRange: t.refinement(t.Number, n => !Number.isNaN(Number(n)) && n > attribute.minRange),
          unitOfMeasurement: t.String,
          precision: t.refinement(
            t.Number,
            n => !Number.isNaN(Number(n)) && !((attribute.maxRange - attribute.minRange) % n),
          ),
          accuracy: t.refinement(
            t.Number,
            n => !Number.isNaN(Number(n)) && !((attribute.maxRange - attribute.minRange) % n),
          ),
        };
        optionalFields.minRange.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (n > attribute.maxRange) {
            return 'Min range is higher than Max Range';
          }
          return '';
        };
        optionalFields.maxRange.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (n < attribute.minRange) {
            return 'Min range is higher than Max Range';
          }
          return '';
        };
        optionalFields.precision.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (((attribute.maxRange - attribute.minRange) % n)) {
            return 'Does not divide range exactly';
          }
          return '';
        };
        optionalFields.accuracy.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (((attribute.maxRange - attribute.minRange) % n)) {
            return 'Does not divide range exactly';
          }
          return '';
        };
        break;
      default:
        // Do nothing.
    }
  }

  return t.struct({
    ...{
      name,
      description,
      deviceResourceType,
      defaultValue,
      dataType,
      format,
    },
    ...optionalFields,
  });
};

const mapStateToProps = (state, ownProps) => {
  const attribute = state.attributes.attributeList.find(
    currentAttribute => currentAttribute.id === ownProps.id,
  );
  return {
    currentAttributeId: state.attributes.currentAttributeId,
    type: getType(state.attributes.attributeList, attribute),
    options: state.attributes.form.options,
    value: attribute,
    ref: (form) => { this.form = form; },
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
    if (Number(this.props.currentAttributeId) === this.props.value.id &&
      this.props.currentAttributeId !== prevProps.currentAttributeId) {
      this.onChange(this.props.value);
    }
  }

  onChange(value) {
    this.props.onChange(value, this.form);
  }
  render() {
    return (
      <Form
        onChange={this.onChange}
        type={this.props.type}
        options={this.props.options}
        value={this.props.value}
        ref={(form) => { this.form = form; }}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
