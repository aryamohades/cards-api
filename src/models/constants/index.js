const RARITIES = [
  'common',
  'uncommon',
  'rare',
  'holo rare',
  'ultra rare',
  'secret rare',
  'none'
];

const RARITY_ERROR = 'Invalid rarity';

const VALID_GRADES = [
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10'
];

const PSA_BGS_ERROR = 'Card cannot be graded by both PSA and BGS';
const PSA_GRADE_ERROR = 'Invalid PSA grade';
const BGS_GRADE_ERROR = 'Invalid BGS grade';

module.exports = {
  RARITIES,
  RARITY_ERROR,
  VALID_GRADES,
  PSA_BGS_ERROR,
  PSA_GRADE_ERROR,
  BGS_GRADE_ERROR
};
