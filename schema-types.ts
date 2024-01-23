export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Дата в формате `Y-m-d`, например `2011-05-23`. */
  Date: any;
  /** Метка времени в формате `Y-m-d H:i:s`, например `2018-05-23 13:43:32`. */
  DateTime: any;
  /** Метка времени в формате `Y-m-d H:i:s`, например `2018-05-23T13:43:32+0000`. */
  DateTimeTz: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
  /** Загрузка файлов https://github.com/jaydenseric/graphql-multipart-request-spec */
  Upload: any;
};

/** Заявка */
export type Application = {
  __typename?: 'Application';
  /** Услуги заявки */
  applicationServices?: Maybe<Array<ApplicationService>>;
  /** Комментарий */
  comment?: Maybe<Scalars['String']>;
  /** Дата создания */
  created_at: Scalars['DateTimeTz'];
  /** Email */
  email?: Maybe<Scalars['String']>;
  /** ФИО */
  fio: Scalars['String'];
  id: Scalars['ID'];
  /** ИНН */
  inn?: Maybe<Scalars['String']>;
  /** Телефон */
  phone: Scalars['String'];
  /** Стоимость услуг заявки */
  service_cost?: Maybe<Scalars['Int']>;
  /** Статус */
  status: ApplicationStatusEnum;
  /** Дата обновления */
  updated_at: Scalars['DateTimeTz'];
};

/** A paginated list of Application items. */
export type ApplicationPaginator = {
  __typename?: 'ApplicationPaginator';
  /** A list of Application items. */
  data: Array<Application>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ApplicationService = {
  __typename?: 'ApplicationService';
  /** Заявка */
  application: Application;
  /** ID заявки */
  application_id?: Maybe<Scalars['Int']>;
  /** Стоимость услуги */
  cost?: Maybe<Scalars['Int']>;
  /** Дата создания */
  created_at: Scalars['DateTimeTz'];
  /** Описание услуги */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Выбрана */
  is_selected?: Maybe<Scalars['Boolean']>;
  /** Название услуги */
  name: Scalars['String'];
  /** Сортировка */
  sort: Scalars['Int'];
  /** Дата обновления */
  updated_at: Scalars['DateTimeTz'];
};

/** A paginated list of ApplicationService items. */
export type ApplicationServicePaginator = {
  __typename?: 'ApplicationServicePaginator';
  /** A list of ApplicationService items. */
  data: Array<ApplicationService>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum ApplicationStatusEnum {
  /** Closed */
  Closed = 'CLOSED',
  /** New */
  New = 'NEW',
  /** Processing */
  Processing = 'PROCESSING',
  /** Rejected */
  Rejected = 'REJECTED'
}

export type CreateApplicationInput = {
  /** Комментарий */
  comment?: InputMaybe<Scalars['String']>;
  /** Email */
  email?: InputMaybe<Scalars['String']>;
  /** ФИО */
  fio: Scalars['String'];
  /** ИНН */
  inn?: InputMaybe<Scalars['String']>;
  /** Телефон */
  phone: Scalars['String'];
  /** ID выбранных услуг */
  selected_service_ids?: InputMaybe<Array<Scalars['Int']>>;
};

export type CreateRoleInput = {
  comment?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  permissions: Array<PermissionsEnum>;
};

export type CreateServiceInput = {
  /** Стоимость */
  cost?: InputMaybe<Scalars['Int']>;
  /** Описание */
  description?: InputMaybe<Scalars['String']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  /** Наименование услуги */
  name: Scalars['String'];
  sort: Scalars['Int'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  ok: Scalars['Boolean'];
};

export enum InputApplicationServiceEnum {
  Cost = 'COST',
  CreatedAt = 'CREATED_AT',
  Description = 'DESCRIPTION',
  Id = 'ID',
  IsSelected = 'IS_SELECTED',
  Name = 'NAME',
  Sort = 'SORT',
  UpdatedAt = 'UPDATED_AT'
}

export enum InputApplicationsEnum {
  Comment = 'COMMENT',
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Fio = 'FIO',
  Id = 'ID',
  Inn = 'INN',
  Phone = 'PHONE',
  ServiceCost = 'SERVICE_COST',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export enum InputUsersEnum {
  Id = 'ID'
}

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Добавление заявки */
  createApplication?: Maybe<Application>;
  /** Создание роли */
  createRole?: Maybe<Role>;
  /** Добавление услуги */
  createService?: Maybe<Service>;
  /** Удаление заявки */
  deleteApplication?: Maybe<DeleteResponse>;
  /** Удаление услуги заявки */
  deleteApplicationService?: Maybe<DeleteResponse>;
  /** Удаление роли */
  deleteRole?: Maybe<DeleteResponse>;
  /** Удаление услуги */
  deleteService?: Maybe<DeleteResponse>;
  /** Вход и получение данных авторизованного пользователя. */
  login: UserLogin;
  /**
   * Выход и получение данных разавторизуемого
   * пользователя в последний раз.
   */
  logout?: Maybe<User>;
  /** Редактирование заявки */
  updateApplication?: Maybe<Application>;
  /** Редактирование услуги заявки */
  updateApplicationService?: Maybe<ApplicationService>;
  /** Редактирование роли */
  updateRole?: Maybe<Role>;
  /** Редактирование услуги */
  updateService?: Maybe<Service>;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteApplicationServiceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


export type MutationUpdateApplicationServiceArgs = {
  input: UpdateApplicationServiceInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

/** Разрешения */
export type Permission = {
  __typename?: 'Permission';
  /** Комментарий */
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Название */
  name: PermissionsEnum;
  /** Подсистема приложения */
  subsystem: SubsystemEnum;
};

export enum PermissionsEnum {
  /** Assign role */
  AssignRole = 'ASSIGN_ROLE',
  /** Create role */
  CreateRole = 'CREATE_ROLE',
  /** Create user */
  CreateUser = 'CREATE_USER',
  /** Deactivate user */
  DeactivateUser = 'DEACTIVATE_USER',
  /** Delete role */
  DeleteRole = 'DELETE_ROLE',
  /** Delete user */
  DeleteUser = 'DELETE_USER',
  /** Edit role */
  EditRole = 'EDIT_ROLE',
  /** Read user */
  ReadUser = 'READ_USER',
  /** Read users list */
  ReadUsersList = 'READ_USERS_LIST',
  /** Update user */
  UpdateUser = 'UPDATE_USER',
  /** View role */
  ViewRole = 'VIEW_ROLE',
  /** View roles list */
  ViewRolesList = 'VIEW_ROLES_LIST'
}

/** Запросы к API */
export type Query = {
  __typename?: 'Query';
  /** Просмотр заявки */
  application?: Maybe<Application>;
  /** Услуги заявки */
  applicationService?: Maybe<ApplicationServicePaginator>;
  /** Просмотр списка заявок */
  applications?: Maybe<ApplicationPaginator>;
  /** Получить текущего пользователя */
  me?: Maybe<User>;
  /** Просмотр разрешения */
  permission?: Maybe<Permission>;
  /** Просмотр списка разрешений */
  permissions: Array<Permission>;
  /** Просмотр роли */
  role?: Maybe<Role>;
  /** Просмотр списка ролей */
  roles: Array<Role>;
  /** Просмотр услуги */
  service?: Maybe<Service>;
  /** Просмотр списка услуг */
  services?: Maybe<ServicePaginator>;
  /** Просмотр пользователя */
  user?: Maybe<User>;
  /** Список пользователей */
  users?: Maybe<UserPaginator>;
};


/** Запросы к API */
export type QueryApplicationArgs = {
  id: Scalars['ID'];
};


/** Запросы к API */
export type QueryApplicationServiceArgs = {
  first?: InputMaybe<Scalars['Int']>;
  hasApplication?: InputMaybe<QueryApplicationServiceHasApplicationWhereHasConditions>;
  page?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QueryApplicationServiceWhereWhereConditions>;
};


/** Запросы к API */
export type QueryApplicationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QueryApplicationsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QueryApplicationsWhereWhereConditions>;
};


/** Запросы к API */
export type QueryPermissionArgs = {
  id: Scalars['ID'];
};


/** Запросы к API */
export type QueryRoleArgs = {
  id: Scalars['ID'];
};


/** Запросы к API */
export type QueryRolesArgs = {
  where?: InputMaybe<QueryRolesWhereWhereConditions>;
};


/** Запросы к API */
export type QueryServiceArgs = {
  id: Scalars['ID'];
};


/** Запросы к API */
export type QueryServicesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<QueryServicesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};


/** Запросы к API */
export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


/** Запросы к API */
export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  hasRoles?: InputMaybe<QueryUsersHasRolesWhereHasConditions>;
  page?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QueryUsersWhereWhereConditions>;
};

/** Allowed column names for Query.applicationService.hasApplication. */
export enum QueryApplicationServiceHasApplicationColumn {
  Id = 'ID'
}

/** Dynamic WHERE conditions for the `hasApplication` argument on the query `applicationService`. */
export type QueryApplicationServiceHasApplicationWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryApplicationServiceHasApplicationWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryApplicationServiceHasApplicationWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryApplicationServiceHasApplicationWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryApplicationServiceHasApplicationColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasApplication` argument on the query `applicationService`. */
export type QueryApplicationServiceHasApplicationWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryApplicationServiceHasApplicationWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Dynamic WHERE conditions for the `where` argument on the query `applicationService`. */
export type QueryApplicationServiceWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryApplicationServiceWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryApplicationServiceWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryApplicationServiceWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<InputApplicationServiceEnum>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `applicationService`. */
export type QueryApplicationServiceWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryApplicationServiceWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Order by clause for Query.applications.orderBy. */
export type QueryApplicationsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: InputApplicationsEnum;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Dynamic WHERE conditions for the `where` argument on the query `applications`. */
export type QueryApplicationsWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryApplicationsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryApplicationsWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryApplicationsWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<InputApplicationsEnum>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `applications`. */
export type QueryApplicationsWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryApplicationsWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Allowed column names for Query.roles.where. */
export enum QueryRolesWhereColumn {
  Id = 'ID',
  Name = 'NAME'
}

/** Dynamic WHERE conditions for the `where` argument on the query `roles`. */
export type QueryRolesWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryRolesWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryRolesWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryRolesWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryRolesWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `roles`. */
export type QueryRolesWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryRolesWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Allowed column names for Query.services.orderBy. */
export enum QueryServicesOrderByColumn {
  Cost = 'COST',
  CreatedAt = 'CREATED_AT',
  Description = 'DESCRIPTION',
  Id = 'ID',
  IsActive = 'IS_ACTIVE',
  Name = 'NAME',
  Sort = 'SORT',
  UpdatedAt = 'UPDATED_AT'
}

/** Order by clause for Query.services.orderBy. */
export type QueryServicesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryServicesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.users.hasRoles. */
export enum QueryUsersHasRolesColumn {
  Name = 'NAME'
}

/** Dynamic WHERE conditions for the `hasRoles` argument on the query `users`. */
export type QueryUsersHasRolesWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryUsersHasRolesWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryUsersHasRolesWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryUsersHasRolesWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryUsersHasRolesColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasRoles` argument on the query `users`. */
export type QueryUsersHasRolesWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryUsersHasRolesWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Dynamic WHERE conditions for the `where` argument on the query `users`. */
export type QueryUsersWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryUsersWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryUsersWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryUsersWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<InputUsersEnum>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `users`. */
export type QueryUsersWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryUsersWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Роли */
export type Role = {
  __typename?: 'Role';
  /** Комментарий */
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Название */
  name: Scalars['String'];
  /** Разрешения */
  permissions: Array<Permission>;
  /** Пользователи */
  users: Array<User>;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** DATE operator (betweеn start and end of day) */
  Date = 'DATE',
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Simple pattern matching (`ILIKE`) */
  Ilike = 'ILIKE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE'
}

/** Услуга */
export type Service = {
  __typename?: 'Service';
  /** Стоимость услуги */
  cost?: Maybe<Scalars['Int']>;
  /** Дата создания */
  created_at: Scalars['DateTimeTz'];
  /** Описание услуги */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Показать на сайте */
  is_active: Scalars['Boolean'];
  /** Название */
  name: Scalars['String'];
  /** Сортировка */
  sort: Scalars['Int'];
  /** Дата обновления */
  updated_at: Scalars['DateTimeTz'];
};

/** A paginated list of Service items. */
export type ServicePaginator = {
  __typename?: 'ServicePaginator';
  /** A list of Service items. */
  data: Array<Service>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export enum SubsystemEnum {
  /** Administration */
  Administration = 'ADMINISTRATION',
  /** Applications */
  Applications = 'APPLICATIONS',
  /** Services */
  Services = 'SERVICES',
  /** Users */
  Users = 'USERS'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateApplicationInput = {
  /** Комментарий */
  comment?: InputMaybe<Scalars['String']>;
  /** Email */
  email?: InputMaybe<Scalars['String']>;
  /** ФИО */
  fio?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** ИНН */
  inn?: InputMaybe<Scalars['String']>;
  /** Телефон */
  phone?: InputMaybe<Scalars['String']>;
  /** Статус */
  status?: InputMaybe<ApplicationStatusEnum>;
};

export type UpdateApplicationServiceInput = {
  /** Стоимость услуги */
  cost?: InputMaybe<Scalars['Int']>;
  /** Описание услуги */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Выбрана */
  is_selected?: InputMaybe<Scalars['Boolean']>;
  /** Название услуги */
  name?: InputMaybe<Scalars['String']>;
  /** Сортировка */
  sort?: InputMaybe<Scalars['Int']>;
};

export type UpdateRoleInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<PermissionsEnum>>;
};

export type UpdateServiceInput = {
  /** Стоимость */
  cost?: InputMaybe<Scalars['Int']>;
  /** Описание */
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Показать на сайте */
  is_active?: InputMaybe<Scalars['Boolean']>;
  /** Наименование услуги */
  name?: InputMaybe<Scalars['String']>;
  /** Сортировка */
  sort?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  /** Метки времени создания/изменения */
  created_at: Scalars['DateTimeTz'];
  id: Scalars['ID'];
  /** Логин пользователя */
  login: Scalars['String'];
  updated_at: Scalars['DateTimeTz'];
};

export type UserLogin = {
  __typename?: 'UserLogin';
  id: Scalars['Int'];
  token: Scalars['String'];
  user: User;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<WhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<WhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<Scalars['String']>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};
