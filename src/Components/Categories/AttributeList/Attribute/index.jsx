import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../actions/actions';

const Form = t.form.Form;

const getType = (state, ownProps, attribute) => {
  const name = t.refinement(t.String, () => !attribute.isDuplicated);
  name.getValidationErrorMessage = () => 'Duplicated name';

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value) => {
    let newValue = value;
    const validation = this.form.validate();
    // Ignore duplicated name errors.
    // Those are handled internally by the reducer to prevent unneccesary dispatch calls.
    const errors = validation.errors.filter(e => e.path[0] !== 'name');
    newValue = {
      ...newValue,
      ...{
        isValid: errors.length === 0,
      },
    };
    dispatch(updateAttribute(ownProps.id, newValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
