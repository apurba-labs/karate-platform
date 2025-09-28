import { User } from './user';
import { Division } from './division';

export interface RulesetTemplate {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy: number;
  values: RulesetTemplateValue[];
  divisions: Division[];
  creator: User;
  createdAt: string;
  updatedAt: string;
}

export interface RulesetTemplateValue {
  id: number;
  rulesetTemplateId: number;
  rulesetParameterId: number;
  valueString?: string;
  valueInt?: number;
  valueBool?: boolean;
  rulesetTemplate: RulesetTemplate;
  parameter: RulesetParameter;
}

export interface RulesetParameter {
  id: number;
  keyName: string;
  category: string;
  dataType: 'INTEGER' | 'BOOLEAN' | 'STRING';
  description: string;
  values: RulesetTemplateValue[];
}