import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../actions/actions';

const Form = t.form.Form;

const getType = (state, ownProps, attribute) => {
  const name = t.refinement(
    t.String,
    n => state.attributes.nameDictionary[n] &&
    state.attributes.nameDictionary[n].filter(
      e => e !== attribute.id).length === 0,
    );
  name.getValidationErrorMessage = (n) => {
    if (!n) {
      return 'Required';
    }
    if (state.attributes.nameDictionary[n] && state.attributes.nameDictionary[n].filter(
      e => e !== attribute.id).length > 0) {
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
    type: getType(state, ownProps, attribute),
    options: state.attributes.form.options,
    value: attribute,
    ref: (form) => { this.form = form; },
  };
};

const onChange = (value, dispatch) => {
  const validation = this.form.validate();
  const newValue = {
    ...value,
    ...{
      errors: validation.errors,
    },
  };
  dispatch(updateAttribute(newValue.id, newValue));
};

const mapDispatchToProps = dispatch => ({
  onChange: value => onChange(value, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
