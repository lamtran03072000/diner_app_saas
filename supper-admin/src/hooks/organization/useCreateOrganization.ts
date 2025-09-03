import { useMutation, useQueryClient } from "@tanstack/react-query";
import organizationService from "../../services/organization";
import type {
  CreateOrganizationRequest,
  Organization,
} from "../../types/organization";

const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createOrganization,
    isPending,
    error,
    isSuccess,
  } = useMutation<Organization, Error, CreateOrganizationRequest>({
    mutationFn: (data: CreateOrganizationRequest) =>
      organizationService.createOrganization(data),
    onSuccess: () => {
      // Invalidate and refetch organizations list
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });

  return {
    createOrganization,
    isLoading: isPending,
    error,
    isSuccess,
  };
};

export default useCreateOrganization;
