import { Typography, Box, Button } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./castMembersSlice";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const initialOptions = {
  page: 1,
  search: "",
  perPage: 10,
  rowsPerPage: [10, 25, 50, 100],
};

export function ListCastMembers() {
  const [options, setOptions] = useState(initialOptions);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  function handleOnPageChange(page: number) {
    options.page = page;
    setOptions({ ...options, page });
  }

  function handeOnPageSizeChange(perPage: number) {
    options.perPage = perPage;
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      options.search = search;
      setOptions({ ...options, search });
    } else setOptions({ ...options, search: "" });
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member deleted successfully", {
        variant: "success",
      });
    }

    if (deleteCastMemberStatus.error) {
      enqueueSnackbar("Cast Member not deleted", { variant: "error" });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography variant="h2">Error fetching cast members</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          style={{ marginBottom: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
    </Box>
  );
}
