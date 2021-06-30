const skillSuggestions = [
  '2D cultures',
  '3D cultures',
  '3D human PD chip',
  '6-OHDA',
  'A53T',
  'Adapter ligation',
  'Adaptive and innate immunity',
  'Adaptive immune cells',
  'Adaptive immunity',
  'Adenosine receptors',
  'Adrenal',
  'Aggregation',
  'Aging',
  'Algorithms',
  'Alpha-synuclein',
  'Alternative pre-mRNA splicing',
  'Amplified cDNA purification',
  'AMPure XP bead binding',
  'Analysis',
  'Animal models',
  'Annotation-free',
  'Anti-HA magnetic beads',
  'Antibodies',
  'Antigen',
  'Antigen-specific response',
  'Antimicrobial peptide',
  'Antioxidants',
  'Antiviral therapy',
  'Apache server',
  'API',
  'ARJP (Autosomal recessive juvenile parkinsonism)',
  'Artificial intelligence',
  'Assay development',
  'Astrocytes',
  'ATP transporter',
  'ATP13A2',
  'ATPase',
  'Atypical Parkinson’s',
  'Autoimmunity',
  'Autonomic dysfunction',
  'Autophagy',
  'Autosomal recessive PD',
  'Aws-cli',
  'Aws-s3',
  'Bacteria',
  'Baginsky',
  'Basal Ganglia',
  'Behavioral pharmacology',
  'Biochemistry',
  'Bioinformatics',
  'Biolegend',
  'Biomarker assay',
  'Biomarker discovery',
  'Biomarker validation',
  'Biomarkers',
  'Biospecimen',
  'Bitopertin',
  'Blood',
  'Blood collection',
  'Blood-Brain barrier',
  'BODIPY',
  'BRAF',
  'Brain',
  'Brain tissue imaging',
  'Brain-on-a-chip',
  'Buffy coat',
  'C. elegans',
  'C57BL/6J',
  'Caffeine',
  'Cancer',
  'Cas9',
  'cDNA amplification',
  'cDNA purification',
  'cDNA synthesis',
  'Cell biology',
  'Cell culture',
  'Cell density',
  'Cell dilution',
  'Cell hashing',
  'Cell Ranger',
  'Cell replacement',
  'Cell suspension',
  'Cellular assays',
  'Cellular toxicity mechanisms',
  'Chaperones',
  'Chemical-genetic interaction',
  'Cholesterol',
  'Choroid plexus',
  'Chromaffin',
  'Chromosomal instability',
  'Cilia',
  'Ciliogenesis',
  'Circadian rhythm',
  'Clinical feature',
  'Clinical measures',
  'Clinical Neurology',
  'Clinical trials',
  'Cloning',
  'Cloud-computing',
  'Cluster analysis',
  'Co-expression networks',
  'Coating',
  'CoExp Web',
  'Cognitive decline',
  'Cognitive dysfunction',
  'Collaboration',
  'Competent',
  'Computer modeling',
  'Conformational strains',
  'CorrSight',
  'Counterstaining',
  'Coverslips',
  'CRISPR',
  'Cross-species',
  'Cryo-EM',
  'Cryo-ET',
  'Cryopreservation',
  'CSF (Cerebral Spinal Fluid)',
  'Culture solutions',
  'Cultures',
  'Cylinder test',
  'DAB staining',
  'DAMPs (Damage-associated molecular patterns)',
  'Data science',
  'Data sharing',
  'Deep learning',
  'Dementia',
  'Dendritic cells',
  'Depression',
  'Deubiquitinases',
  'Development',
  'Developmental biology',
  'Differentiation',
  'Digital measures',
  'Digital pathology',
  'Dilution of cell suspension',
  'Direct cDNA  sequencing',
  'Disease heterogeneity',
  'Disease mechanisms',
  'Disease models',
  'Disease modification',
  'Disease risks',
  'Dispase',
  'Disuccinimidyl suberate',
  'Disuccinimidyl sulfoxide',
  'DJ-1',
  'DMT1 - divalent metal (ion) transporter 1',
  'DNA',
  'DNA damage',
  'DNA damage response',
  'DNA isolation',
  'DNA repair',
  'Docker',
  'Dopamine',
  'Dopaminergic',
  'Doublet',
  'Drosophila',
  'Drug repurposing',
  'Drug targets',
  'Dxn',
  'Dyskinesia',
  'E1-like enzyme ATG7',
  'E8 medium',
  'Ear tag',
  'Early embryonic spatial patterning',
  'Early onset PD',
  'Ecogenomics',
  'Electron microscopy',
  'Electrons',
  'Electrophysiology',
  'Electroporation',
  'EM grids',
  'Endolysosomal dysfunction',
  'Endolysosomes',
  'Endosomes',
  'Energy failure',
  'Enteric nervous system',
  'Environment',
  'Environmental chemicals',
  'Environmental toxins',
  'Enzymes',
  'Epidemiology',
  'Epigenomics',
  'ER tubular network',
  'ES cultures',
  'Etag',
  'Ethnic diversity',
  'Excitotoxicity',
  'Exercise',
  'Exosomes',
  'Expression',
  'Extracellular vesicles',
  'Eyes',
  'FACS',
  'Fast exchange mutant',
  'FCCP titration',
  'FIB-SEM',
  'Fibril',
  'Flow cytometry',
  'Fluid-based biomarkers',
  'Fluorescence imaging',
  'Fluorospot assay',
  'Free-floating IHC',
  'Function',
  'Functional biotype',
  'Functional genomics',
  'Functional impairment',
  'Functional phenotype',
  'GBA (Glucocerebrosidase)',
  'GCase',
  'GCase activity',
  'Gender',
  'Gene therapy',
  'Gene-environment interactions',
  'Genetic interactions',
  'Genetic models',
  'Genetic risk',
  'Genetic screen',
  'Genetic susceptibility',
  'Genetic targets',
  'Genetic variants',
  'Genetics',
  'Genome editing',
  'Genomics',
  'Genotyping',
  'Gentra Puregene Kit',
  'GFP-3C-TwinStrep',
  'GFP-nanobody immobilization',
  'GFP-nanobody purification',
  'GI/gut motility',
  'Giant unilamellar vesicles',
  'Glia',
  'Glucose titration',
  'Glutamate receptors',
  'Glutamate signaling',
  'Glycolysis stress test',
  'Golgi apparatus',
  'GPNNB',
  'Grants administration',
  'Grants management',
  'GST-TEV-ATG2A-mCherry',
  'Gut',
  'Gut-brain axis',
  'GWAS',
  'H&E staining',
  'H4B4',
  'HA-tagged protein',
  'HEK GnTI cells',
  'High Content Screening',
  'hiPSCs (Human induced pluripotent stem cells)',
  'Histology',
  'Homo sapiens GST-ATG4B recombinant protein',
  'hPSCs (Human pluripotent stem cells)',
  'HTTP',
  'Human',
  'Human Bone Marrow cells',
  'Human brains',
  'Human-mouse xenograft model',
  'Idiopathic',
  'iGlia (induced glia)',
  'Imaging',
  'Immune activation',
  'Immune response',
  'Immune tolerance',
  'Immunity',
  'Immunofluorescence',
  'Immunohistochemistry',
  'Immunoprecipitation',
  'Immunotherapy',
  'in situ',
  'in situ RNA analytics',
  'in vitro',
  'in vivo',
  'iNeurons (induced neurons)',
  'Infection',
  'Infection models',
  'Inflammasomes',
  'Inflammation',
  'Injections',
  'Innate immunity',
  'Integrity monitoring',
  'Interorganellar contact sites',
  'Intestine',
  'Intracellular',
  'intracellular transport',
  'Intracerebral transplantation',
  'Ion channels and receptors',
  'iPSCs (Induced pluripotent stem cells)',
  'Iron',
  'Iron and copper',
  'Isogenic',
  'Isolation',
  'Kinase',
  'Kinase dynamics',
  'Kinesin',
  'L444P',
  'Lamina propria',
  'LAMP2',
  'LC3 lipidation',
  'LD PCR',
  'Lentivirus',
  'Leukocyte trafficking',
  'Lewy bodies',
  'Library',
  'Lifespan',
  'Ligation reactions',
  'Light-electron',
  'Lipidomics',
  'Lipids',
  'Liquid-liquid phase separation',
  'Live-imaging',
  'Locus coeruleus',
  'Long-read sequencing',
  'LRRK2',
  'LRRK2 pathway',
  'Lumbar puncture',
  'Lymphocytes',
  'Lysate preparation',
  'Lysosomal -omics',
  'Lysosomal dysfunction',
  'Lysosomal homeostasis',
  'Lysosomes',
  'Lysotracker',
  'Machine learning',
  'Macrophage',
  'Malachite Green method',
  'Mammalian cells',
  'Manganese',
  'Mass',
  'Mass spectrometry',
  'Matrigel',
  'md5',
  'md5sum',
  'Medial forebrain bundle',
  'Medicine',
  'Melanoma',
  'Membrane traffic',
  'Membrane trafficking',
  'Membrane-protein interaction',
  'Mesenephalic',
  'Metabolic',
  'Metabolism',
  'Metabolomics',
  'Metagenome',
  'Mice',
  'Microbial amyloid proteins',
  'Microbial exposure',
  'Microbiome',
  'Microfluidic devices',
  'Microfluidic wnt gradient',
  'Microglia',
  'Microscopy',
  'Microtubule',
  'Microtubule interaction',
  'Midbrains',
  'miRNA',
  'Miro1',
  'Mitochondria',
  'Mitochondria-nucleus communication',
  'Mitochondria/lysosome axis',
  'Mitochondrial',
  'Mitochondrial dysfunction',
  'Mitochondrial morphology',
  'Mitochondrial stress test',
  'Mitophagy',
  'MitoSOX',
  'Modifiers',
  'Molecular chaperone',
  'Molecular mechanism',
  'Monocyte',
  'Monocyte isolation',
  'Motility assay',
  'Motor symptoms',
  'Mouse',
  'Movement Disorders',
  'MSA (Multiple system atrophy)',
  'mTOR',
  'Multi-electrode array',
  'Multi-omics',
  'Multimerization',
  'Mutational signature',
  'Mutations',
  'Myeloid',
  'Nanobodies',
  'Nanopore sequencing',
  'Network analysis',
  'Networking',
  'Neural circuitry',
  'Neuro-immune',
  'Neuro-immune interaction',
  'Neuro-immune sensitization',
  'Neurobehavioral',
  'Neurobiology',
  'Neurodegeneration',
  'Neurodegenerative disorders',
  'Neurogenesis',
  'Neuroimaging',
  'Neuroinflammation',
  'Neurologic Examination',
  'Neurological',
  'Neurological Diseases',
  'Neurology',
  'Neuromelanin',
  'Neuromodulation',
  'Neuron tags',
  'Neuronal counting',
  'Neuronal structure',
  'Neurons',
  'Neuropharmacology',
  'Neuroprotection',
  'Neuroprotective/regenerative',
  'Neuroscience',
  'Neurotransmitters',
  'Neutrophils',
  'Next Generation Neuropathology',
  'Next generation sequencing',
  'NF-kappaB',
  'NHS-sepharose',
  'Non-coding RNA',
  'Non-human primates',
  'Non-motor symptoms',
  'Non-profit health sector',
  'NPC',
  'Nuclear extraction',
  'Nuclei isolation',
  'Nucleotide binding',
  'Nurr1',
  'Olfactory dysfunction',
  'Olfactory mucosa',
  'Oligomer',
  'Oligomeric assays',
  'omics',
  'Open science',
  'Optogenetics',
  'Organelle contact sites',
  'Organoid',
  'Oxidative stress',
  'PacBio Iso-Seq preparation',
  'PAK6',
  'Paraffin',
  'Parkin (PARK2)',
  "Parkinson's disease",
  'Parkinsonism',
  'Pathogens',
  'Pathology',
  'Pathomechanism',
  'Pathophysiology',
  'Patient biosamples',
  'Patient registry',
  'Paxgene processing',
  'PBMC (Peripheral blood mononuclear cells)',
  'PBMC isolation',
  'PCR',
  'PD progression',
  'PD risks',
  'PD subtypes',
  'Peptide pools',
  'Perfusion',
  'Peripheral immune system',
  'Perturb-seq',
  'Pesticides',
  'PET (Positron emission tomography)',
  'Petri dishes',
  'PGRN (Progranulin)',
  'Phagocytosis',
  'Pharmacokinetics',
  'Phenomics',
  'Phenotypic variability',
  'Philanthropy',
  'Phosphatase',
  'Phospho-code',
  'Phosphorylation',
  'PI3KC3-C1 complex',
  'PINK1',
  'Plasma',
  'Plasmid amplification',
  'Plasmids',
  'Plasticity',
  'Poly-l-lysine',
  'Polyamine',
  'Polyamine-BODIPY Uptake',
  'Post-mortem brain tissues',
  'Postnatal',
  'Postural instability',
  'PPM1H',
  'PPM1H phosphatase',
  'pRabs',
  'Predictive models',
  'Preparation',
  'Primary cilia',
  'Primary culture',
  'Prion',
  'Prodromal PD',
  'Prodrome',
  'Production',
  'Profiling',
  'Program operations',
  'Project management',
  'Propagation',
  'PROTAC (Proteolysis targeting chimera)',
  'Protein aggregates',
  'Protein complexes',
  'Protein crosslinking',
  'Protein degradation',
  'Protein handling',
  'Protein purification',
  'Protein-interaction/signaling',
  'Protein-protein interaction',
  'Protein-protein interaction tags',
  'Proteins',
  'Proteomic analysis',
  'Proteomics',
  'Proteosome',
  'Proteostasis',
  'Proteotoxicity',
  'Proximity proteomics',
  'PRS (Polygenic risk score)',
  'pS910',
  'pS935',
  'PTEN',
  'Pulse-chase',
  'Purification',
  'Python',
  'QIAcube',
  'QIAgen',
  'qPCR',
  'Quantifying gene expression',
  'Quantitative immunoblotting',
  'R Plumber',
  'Rab',
  'Rab GTPases',
  'Rab29',
  'RabGTPases',
  'Rapid autopsy',
  'Rats',
  'Reactive astrocytes',
  'Regulatory gene networks',
  'Regulome glia ATAC-seq',
  'REST API',
  'Retromer',
  'Reverse transcription',
  'Risk genes',
  'Risk loci',
  'RNA',
  'RNA analytics',
  'RNA binding proteins',
  'RNA degradation',
  'RNA-seq',
  'RNAi',
  's3-bucket',
  'Saliva',
  'Sample preparation',
  'scRNAseq (Single-cell RNA-seq)',
  'Second strand synthesis',
  'Sectioning',
  'Seeding assays',
  'Senescence',
  'Senolytic',
  'Sequencing',
  'Sequential rehydration',
  'ShinyApp',
  'ShinyProxy',
  'Single-cell',
  'Single-cell analysis',
  'Single-cell eQTL',
  'Single-cell multi-omics',
  'Single-cell transcriptomics',
  'Single-molecule',
  'SJ1',
  'Sleep disorders',
  'SNpc (Substantia nigra pars compacta)',
  'snRNA-seq (Single-nuclear RNA-seq)',
  'Somatic gene recombination',
  'Somatic genetic mutation',
  'Spatial transcriptomics',
  'Spectrometry',
  'Spermine',
  'Sphingolipids',
  'Spinal Motor Neurons',
  'Spine density',
  'Spreading',
  'Staining',
  'STAR',
  'Stem cells',
  'Stem cells – adult',
  'Stem cells – animal',
  'Stem cells – embryonic',
  'Stem cells – fetal',
  'Stereotactic',
  'Strain',
  'Strand-switching',
  'Stratification',
  'Structural biology',
  'Structure',
  'Structure guided drug design',
  'Super-resolution microscopy',
  'Superoxide',
  'Surgical',
  'Synapse',
  'Synaptic dysfunction',
  'Synaptic trafficking',
  'Synaptic transmission',
  'Synaptic vesicle exocytosis',
  'Systems biology',
  'Systems genetics',
  'Systems immunology',
  'T cells',
  'T lymphocytes',
  'Target validation',
  'TBK1',
  'TCR repertoire',
  'TCRs (T cell Receptors)',
  'TE annotations',
  'TE expression',
  'Team science',
  'Temperature',
  'TEtranscripts',
  'TGN (Trans-Golgi network)',
  'Therapeutic development',
  'Tissue',
  'Titration',
  'TMEM115',
  'Transcriptional regulation',
  'Transcriptomics',
  'Transdifferentiation',
  'Transfection',
  'Transformation',
  'Transport',
  'Transposable elements',
  'Tri-culture system model C3',
  'Tropic factors/GDNF',
  'Tunneling Nanotubes',
  'Ubiquitin',
  'UCH-L1',
  'Ultrastructure microscopy',
  'vATPase a1',
  'Ventral midbrain',
  'Vesicle trafficking',
  'Vibratome',
  'Viral vectors',
  'VPS13C',
  'VPS35',
  'Web development',
  'Western Blot',
  'Whole blood',
  'Xenobiotics',
];

export default skillSuggestions;
