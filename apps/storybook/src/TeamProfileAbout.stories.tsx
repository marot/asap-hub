import React, { ComponentProps } from 'react';
import { TeamProfileAbout } from '@asap-hub/react-components';
import { text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Templates / Team Profile / About',
  component: TeamProfileAbout,
};

const props = (): ComponentProps<typeof TeamProfileAbout> => ({
  projectTitle:
    'Molecular actions of PD-associated pathological proteins using in vitro human pluripotent steam cell brain organoids.',
  projectSummary:
    'This project provides a transformational biological understanding of the cellular mechanisms that converge to cause the degeneration seen in Parkinson’s disease (PD), given the now well-studied genetic landscape [1]. The specific hypothesis addressed by this proposal is that bioenergetic (mitochondrial and mTOR regulation), glycolipid/lipid and neuroimmune abnormalities can converge, resulting in cell dysfunction of neurons, astrocytes and microglia that lead to PD. The current conventional view of the cellular and systemic culprits of PD has not led to any successful drug development. This project is organized into 5 synergistic research components. Each Co-Investigator (Co-I) addresses the central research questions in different human cellular systems (neurons and glia), in vivo models and methodological frameworks. The proposed work will provide new and transformational biological insight by systematically connecting critical cellular, organelle, metabolic, and neuroimmune mechanisms that converge in unique and specific intercellular pathways to cause the degeneration leading to PD. These critical experiments and analyses proposed will have a high and lasting impact on development of new PD therapeutics. Without this kind of comprehensive study by several teams working together, siloed information, such as protein aggregation, mitochondrial failure, autophagy, mTOR/lysosomal abnormalities and lipid stress will remain as detailed but incomplete and disconnected narratives, not reflecting what actually causes PD in individual patients with age.',
  skills: [],
  pointOfContact: {
    id: '2',
    displayName: 'Peter Venkman',
    firstName: 'Peter',
    lastName: 'Venkman',
    email: 'peter@ven.com',
    role: 'Project Manager',
  },
  teamGroupsCard: boolean('Team Groups placeholder toggle', true)
    ? 'Team Groups Card here'
    : null,
  members: [
    {
      id: '1',
      href: '#memeber',
      displayName: 'Daniel Ramirez',
      firstName: 'Daniel',
      lastName: 'Ramirez',
      role: 'Lead PI (Core Leadership)',
    },
    {
      id: '2',
      href: '#memeber',
      displayName: 'Peter Venkman',
      firstName: 'Peter',
      lastName: 'Venkman',
      role: 'Project Manager',
      avatarUrl: text(
        'Member 2 Avatar URL',
        'https://www.hhmi.org/sites/default/files/styles/epsa_250_250/public/Programs/Investigator/Randy-Schekman-400x400.jpg',
      ),
    },
    {
      id: '3',
      href: '#memeber',
      displayName: 'Tess W. B. Goetz',
      firstName: 'Tess',
      lastName: 'Goetz',
      role: 'Collaborating PI',
    },
    {
      id: '4',
      href: '#memeber',
      displayName: 'Robin Peploe',
      firstName: 'Robin',
      lastName: 'Peploe',
      role: 'Collaborating PI',
    },
    {
      id: '5',
      href: '#memeber',
      displayName: 'Alice Lane',
      firstName: 'Alice',
      lastName: 'Lane',
      role: 'Collaborating PI',
    },
    {
      id: '6',
      href: '#memeber',
      displayName: 'Philip Mars',
      firstName: 'Philip',
      lastName: 'Mars',
      role: 'Collaborating PI',
    },
    {
      id: '7',
      href: '#memeber',
      displayName: 'Emmanuel Depay',
      firstName: 'Emanuel',
      lastName: 'Depay',
      role: 'Collaborating PI',
    },
  ],
});

export const Normal = () => <TeamProfileAbout {...props()}></TeamProfileAbout>;