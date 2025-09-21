// models/TwitterCommunity.ts
export interface TwitterCommunityResponse {
  result: {
    result: Community;
    id: string;
  };
}

export interface Community {
  __typename: string;
  is_member: boolean;
  name: string;
  role: string;
  rest_id: string;
  description: string;
  join_policy: string;
  created_at: number;
  member_count: number;
  primary_community_topic?: {
    topic_name: string;
  };
  rules: Rule[];
  creator_results: {
    result: CreatorResult;
    id: string;
  };
  custom_banner_media?: BannerMedia;
  default_banner_media?: BannerMedia;
  members_facepile_results: MemberFacepile[];
}

export interface Rule {
  rest_id: string;
  name: string;
  description?: string;
  id: string;
}

export interface CreatorResult {
  __typename: string;
  id: string;
  is_blue_verified: boolean;
  legacy: {
    screen_name: string;
  };
  verification: {
    verified: boolean;
  };
}

export interface BannerMedia {
  media_info: {
    __typename: string;
    original_img_url: string;
    original_img_width: number;
    original_img_height: number;
  };
  id: string;
}

export interface MemberFacepile {
  result: {
    __typename: string;
    legacy: {
      profile_image_url_https: string;
    };
    id: string;
  };
  id: string;
}
