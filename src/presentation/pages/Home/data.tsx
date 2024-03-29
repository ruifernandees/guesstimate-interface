export const DEFAULT_DATABASE = `
  NAME: Diagnóstico

  RULES:
  IF fadiga & dor_de_cabeça & dores_no_corpo & ocasionais_dores_garganta & ocasionais_tosses THEN covid19
  IF dor_de_cabeça & garganta_inflamada & tosse THEN gripe
  IF cansaço & dor_de_cabeça THEN mononucleose_infecciosa
  IF cansaço & garganta_inflamada THEN amigdalite
  IF cansaço THEN estresse
  IF fadiga & dor_de_cabeça & pulsação_elevada & baixo_nível_de_oxigênio & perda_de_olfato & perda_de_paladar THEN covid19
  IF coriza & espirro THEN rinite_alergica
  IF dor_de_cabeça & coriza THEN sinusite

  TARGETS:
  gripe
  mononucleose_infecciosa
  amigdalite
  covid19
  rinite_alergica
  sinusite
  estresse
`;
