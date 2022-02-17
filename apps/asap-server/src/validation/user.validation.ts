import { UserPatchRequest } from '@asap-hub/model';
import { JSONSchemaType } from 'ajv';
import { validateInput } from './';

const userInputValidationSchema: JSONSchemaType<UserPatchRequest> = {
  type: 'object',
  properties: {
    jobTitle: { type: 'string', nullable: true },
    onboarded: { type: 'boolean', nullable: true },
    contactEmail: { type: 'string', nullable: true },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    degree: {
      type: 'string',
      enum: [
        'BA',
        'BSc',
        'MSc',
        'PhD',
        'MD',
        'MD, PhD',
        'MPH',
        'MA',
        'MBA',
        '',
        null,
      ],
      nullable: true,
    },
    institution: { type: 'string', nullable: true },
    biography: { type: 'string', nullable: true },
    country: { type: 'string', nullable: true },
    city: { type: 'string', nullable: true },
    expertiseAndResourceTags: {
      type: 'array',
      items: { type: 'string' },
      nullable: true,
    },
    expertiseAndResourceDescription: { type: 'string', nullable: true },
    researchInterests: { type: 'string', nullable: true },
    responsibilities: { type: 'string', nullable: true },
    reachOut: { type: 'string', maxLength: 250, nullable: true },
    questions: { type: 'array', items: { type: 'string' }, nullable: true },
    teams: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
      nullable: true,
    },
    social: {
      type: 'object',
      additionalProperties: false,
      properties: {
        website1: { type: 'string', nullable: true },
        website2: { type: 'string', nullable: true },
        linkedIn: { type: 'string', nullable: true },
        researcherId: { type: 'string', nullable: true },
        twitter: { type: 'string', nullable: true },
        github: { type: 'string', nullable: true },
        googleScholar: { type: 'string', nullable: true },
        researchGate: { type: 'string', nullable: true },
      },
      nullable: true,
    },
  },
  additionalProperties: false,
};

export const validateUserInput = validateInput(userInputValidationSchema, {
  skipNull: true,
});

type UserParameters = {
  userId: string;
};

const userParametersSchema: JSONSchemaType<UserParameters> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
  },
  required: ['userId'],
  additionalProperties: false,
};

export const validateUserParameters = validateInput(userParametersSchema);
