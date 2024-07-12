import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAddProject } from '../../model/add-project-store';
import { validateProject } from '../../lib/validate-project';
import { formatProject } from '../../lib/format-project';
import { createProject } from '../../api/create-project';
import { TFormatedProject } from '../../model/formated-project.type';

import { ProjectsAddProjectButton } from './button';
import { AddProjectForm } from './form';

import { useNotification } from '@/src/shared/ui/notification/model/notification-store';
import { ModalWrapper } from '@/src/shared/ui/modal';

export const AddProjectModal = () => {
  const { addNotification } = useNotification();
  const { project, reset } = useAddProject();
  const router = useRouter();

  const create = useMutation({
    mutationFn: (project: TFormatedProject) => {
      return createProject(project);
    },
  });

  const handleSave = () => {
    validateProject(project).then((error) => {
      if (error) {
        addNotification({ text: error, type: 'danger' });
      } else {
        create.mutate(formatProject(project));
      }
    });
  };

  useEffect(() => {
    if (create.isError) {
      addNotification({ text: 'Ошибка создания проекта', type: 'danger' });
    }
    if (create.isSuccess) {
      router.refresh();
    }
  }, [create]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <ModalWrapper
      actionButtons={<ProjectsAddProjectButton actionFunc={handleSave} />}
      title='Добавить проект'
    >
      <AddProjectForm actionFunc={handleSave} />
    </ModalWrapper>
  );
};
