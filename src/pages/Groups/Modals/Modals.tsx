import { useCallback, useState } from "react";
import { GroupModel, GroupViewModel, Profile } from "../../../store/model";
import { useDispatch } from "react-redux";
import { addGroup, editGroup, removeGroup } from "../../../store/action";
import { toast } from "react-toastify";
import { useForm } from "antd/lib/form/Form";

export const ModalsFn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [visibleAddEditGroup, setVisibleAddOrEditGroup] = useState(false);

  const formAddOrEditGroup = useForm<GroupModel>();

  const toggleAddGroup = useCallback(() => {
    formAddOrEditGroup[0].resetFields();
    setVisibleAddOrEditGroup(!visibleAddEditGroup);
  }, [visibleAddEditGroup]);

  const toggleEditGroup = useCallback(
    (value: GroupViewModel) => {
      setVisibleAddOrEditGroup(!visibleAddEditGroup);
      console.log(value);
      formAddOrEditGroup[0].setFieldsValue({
        id: value.id,
        name: value.name,
        tasks: value.tasks.map(t => {
          return { task: t.task, duration: t.duration };
        }),
        users: value.users,
      });
    },
    [visibleAddEditGroup],
  );

  const handlerAddOrEditGroup = useCallback((value: GroupModel) => {
    setLoading(true);
    if (value.id > 0) dispatch(editGroup(value, onCallBack));
    else dispatch(addGroup(value, onCallBack));
  }, []);

  const handlerRemoveGroup = useCallback((id: number) => {
    setLoading(true);
    dispatch(removeGroup(id, onCallBack));
  }, []);

  const onCallBack = useCallback(
    (res?: any, err?: any) => {
      if (res) {
        setTimeout(() => {
          toast.success("Is successfully");
          setLoading(false);
          formAddOrEditGroup[0].resetFields();
        }, 500);
      }

      if (err) {
        setTimeout(() => {
          toast.error("Fail");
          setLoading(false);
        }, 500);
      }
    },
    [loading],
  );

  return {
    loading,
    setLoading,
    handlerAddOrEditGroup,
    handlerRemoveGroup,
    onCallBack,
    formAddOrEditGroup,
    visibleAddEditGroup,
    toggleAddGroup,
    toggleEditGroup,
  };
};
