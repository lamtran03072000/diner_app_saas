import { useQuery } from "@tanstack/react-query";
import organizationService from "../../services/organization";
import type { OrganizationsListResponse } from "../../types/organization";

interface UseListOrganizationParams {
  page?: number;
  limit?: number;
}

const useListOrganization = ({
  page = 1,
  limit = 20,
}: UseListOrganizationParams = {}) => {
  const { data, isLoading, error, refetch, isFetching } =
    useQuery<OrganizationsListResponse>({
      queryKey: ["organizations", page, limit],
      queryFn: () => organizationService.getOrganizations(page, limit),
    });

  return {
    organizations: data?.data || [],
    pagination: {
      current: data?.page || 1,
      pageSize: data?.limit || 20,
      total: data?.total || 0,
      totalPages: data?.totalPages || 0,
    },
    isLoading,
    error,
    refetch,
    isFetching,
  };
};

export default useListOrganization;
