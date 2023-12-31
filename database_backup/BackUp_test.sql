PGDMP     6                    {            test    15.3    15.3 3    5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    16398    test    DATABASE        CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE test;
                postgres    false            9           0    0    DATABASE test    COMMENT     *   COMMENT ON DATABASE test IS 'first test';
                   postgres    false    3384            �            1259    16441    chucuahangs    TABLE     6  CREATE TABLE public.chucuahangs (
    id integer NOT NULL,
    hoten character varying(100),
    diachi character varying(255),
    sdt character(10),
    email character varying(100),
    gioitinh bit(1),
    anhdaidien character varying(255),
    "createdAt" date,
    "updatedAt" date,
    ngaysinh date
);
    DROP TABLE public.chucuahangs;
       public         heap    postgres    false            �            1259    16440    chucuahangs_macch_seq    SEQUENCE     �   CREATE SEQUENCE public.chucuahangs_macch_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.chucuahangs_macch_seq;
       public          postgres    false    217            :           0    0    chucuahangs_macch_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.chucuahangs_macch_seq OWNED BY public.chucuahangs.id;
          public          postgres    false    216            �            1259    16419    cuahangs    TABLE     2  CREATE TABLE public.cuahangs (
    id integer NOT NULL,
    macch integer,
    tencuahang character varying(100),
    diachi character varying(255),
    sdt character(10) NOT NULL,
    email character varying(100) NOT NULL,
    anhlogo character varying(255),
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.cuahangs;
       public         heap    postgres    false            �            1259    16418    cuahang_macuahang_seq    SEQUENCE     �   CREATE SEQUENCE public.cuahang_macuahang_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.cuahang_macuahang_seq;
       public          postgres    false    215            ;           0    0    cuahang_macuahang_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cuahang_macuahang_seq OWNED BY public.cuahangs.id;
          public          postgres    false    214            �            1259    16454 	   nguoilams    TABLE     4  CREATE TABLE public.nguoilams (
    id integer NOT NULL,
    hoten character varying(100),
    diachi character varying(255),
    sdt character(10),
    email character varying(100),
    ngaysinh date,
    gioitinh bit(1),
    anhdaidien character varying(255),
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.nguoilams;
       public         heap    postgres    false            �            1259    16453    nguoilams_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nguoilams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.nguoilams_id_seq;
       public          postgres    false    219            <           0    0    nguoilams_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.nguoilams_id_seq OWNED BY public.nguoilams.id;
          public          postgres    false    218            �            1259    16520    thongtindangnhaps    TABLE     �   CREATE TABLE public.thongtindangnhaps (
    id integer NOT NULL,
    sdt character(10),
    email character varying(100),
    pass character varying(100),
    trangthai bit(1),
    "createdAt" date,
    "updatedAt" date
);
 %   DROP TABLE public.thongtindangnhaps;
       public         heap    postgres    false            �            1259    16519    thongtindangnhaps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.thongtindangnhaps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.thongtindangnhaps_id_seq;
       public          postgres    false    223            =           0    0    thongtindangnhaps_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.thongtindangnhaps_id_seq OWNED BY public.thongtindangnhaps.id;
          public          postgres    false    222            �            1259    16476    yeucaulamviecs    TABLE     �   CREATE TABLE public.yeucaulamviecs (
    id integer NOT NULL,
    macuahang integer NOT NULL,
    manl integer NOT NULL,
    trangthai character varying(20) NOT NULL,
    "createdAt" date,
    "updatedAt" date
);
 "   DROP TABLE public.yeucaulamviecs;
       public         heap    postgres    false            �            1259    16475    yeucaulamviecs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.yeucaulamviecs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.yeucaulamviecs_id_seq;
       public          postgres    false    221            >           0    0    yeucaulamviecs_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.yeucaulamviecs_id_seq OWNED BY public.yeucaulamviecs.id;
          public          postgres    false    220            z           2604    16444    chucuahangs id    DEFAULT     s   ALTER TABLE ONLY public.chucuahangs ALTER COLUMN id SET DEFAULT nextval('public.chucuahangs_macch_seq'::regclass);
 =   ALTER TABLE public.chucuahangs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            y           2604    16422    cuahangs id    DEFAULT     p   ALTER TABLE ONLY public.cuahangs ALTER COLUMN id SET DEFAULT nextval('public.cuahang_macuahang_seq'::regclass);
 :   ALTER TABLE public.cuahangs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            {           2604    16457    nguoilams id    DEFAULT     l   ALTER TABLE ONLY public.nguoilams ALTER COLUMN id SET DEFAULT nextval('public.nguoilams_id_seq'::regclass);
 ;   ALTER TABLE public.nguoilams ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            }           2604    16523    thongtindangnhaps id    DEFAULT     |   ALTER TABLE ONLY public.thongtindangnhaps ALTER COLUMN id SET DEFAULT nextval('public.thongtindangnhaps_id_seq'::regclass);
 C   ALTER TABLE public.thongtindangnhaps ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            |           2604    16479    yeucaulamviecs id    DEFAULT     v   ALTER TABLE ONLY public.yeucaulamviecs ALTER COLUMN id SET DEFAULT nextval('public.yeucaulamviecs_id_seq'::regclass);
 @   ALTER TABLE public.yeucaulamviecs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            ,          0    16441    chucuahangs 
   TABLE DATA           ~   COPY public.chucuahangs (id, hoten, diachi, sdt, email, gioitinh, anhdaidien, "createdAt", "updatedAt", ngaysinh) FROM stdin;
    public          postgres    false    217   �<       *          0    16419    cuahangs 
   TABLE DATA           p   COPY public.cuahangs (id, macch, tencuahang, diachi, sdt, email, anhlogo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   t=       .          0    16454 	   nguoilams 
   TABLE DATA           |   COPY public.nguoilams (id, hoten, diachi, sdt, email, ngaysinh, gioitinh, anhdaidien, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   �=       2          0    16520    thongtindangnhaps 
   TABLE DATA           f   COPY public.thongtindangnhaps (id, sdt, email, pass, trangthai, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   x>       0          0    16476    yeucaulamviecs 
   TABLE DATA           b   COPY public.yeucaulamviecs (id, macuahang, manl, trangthai, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   �?       ?           0    0    chucuahangs_macch_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.chucuahangs_macch_seq', 22, true);
          public          postgres    false    216            @           0    0    cuahang_macuahang_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cuahang_macuahang_seq', 19, true);
          public          postgres    false    214            A           0    0    nguoilams_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.nguoilams_id_seq', 15, true);
          public          postgres    false    218            B           0    0    thongtindangnhaps_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.thongtindangnhaps_id_seq', 14, true);
          public          postgres    false    222            C           0    0    yeucaulamviecs_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.yeucaulamviecs_id_seq', 27, true);
          public          postgres    false    220            �           2606    16452 !   chucuahangs chucuahangs_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.chucuahangs
    ADD CONSTRAINT chucuahangs_email_key UNIQUE (email);
 K   ALTER TABLE ONLY public.chucuahangs DROP CONSTRAINT chucuahangs_email_key;
       public            postgres    false    217            �           2606    16448    chucuahangs chucuahangs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.chucuahangs
    ADD CONSTRAINT chucuahangs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.chucuahangs DROP CONSTRAINT chucuahangs_pkey;
       public            postgres    false    217            �           2606    16450    chucuahangs chucuahangs_sdt_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.chucuahangs
    ADD CONSTRAINT chucuahangs_sdt_key UNIQUE (sdt);
 I   ALTER TABLE ONLY public.chucuahangs DROP CONSTRAINT chucuahangs_sdt_key;
       public            postgres    false    217                       2606    16430    cuahangs cuahang_email_key 
   CONSTRAINT     V   ALTER TABLE ONLY public.cuahangs
    ADD CONSTRAINT cuahang_email_key UNIQUE (email);
 D   ALTER TABLE ONLY public.cuahangs DROP CONSTRAINT cuahang_email_key;
       public            postgres    false    215            �           2606    16426    cuahangs cuahang_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.cuahangs
    ADD CONSTRAINT cuahang_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.cuahangs DROP CONSTRAINT cuahang_pkey;
       public            postgres    false    215            �           2606    16428    cuahangs cuahang_sdt_key 
   CONSTRAINT     R   ALTER TABLE ONLY public.cuahangs
    ADD CONSTRAINT cuahang_sdt_key UNIQUE (sdt);
 B   ALTER TABLE ONLY public.cuahangs DROP CONSTRAINT cuahang_sdt_key;
       public            postgres    false    215            �           2606    16465    nguoilams nguoilams_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.nguoilams
    ADD CONSTRAINT nguoilams_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.nguoilams DROP CONSTRAINT nguoilams_email_key;
       public            postgres    false    219            �           2606    16461    nguoilams nguoilams_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.nguoilams
    ADD CONSTRAINT nguoilams_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.nguoilams DROP CONSTRAINT nguoilams_pkey;
       public            postgres    false    219            �           2606    16463    nguoilams nguoilams_sdt_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.nguoilams
    ADD CONSTRAINT nguoilams_sdt_key UNIQUE (sdt);
 E   ALTER TABLE ONLY public.nguoilams DROP CONSTRAINT nguoilams_sdt_key;
       public            postgres    false    219            �           2606    16529 -   thongtindangnhaps thongtindangnhaps_email_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.thongtindangnhaps
    ADD CONSTRAINT thongtindangnhaps_email_key UNIQUE (email);
 W   ALTER TABLE ONLY public.thongtindangnhaps DROP CONSTRAINT thongtindangnhaps_email_key;
       public            postgres    false    223            �           2606    16525 (   thongtindangnhaps thongtindangnhaps_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.thongtindangnhaps
    ADD CONSTRAINT thongtindangnhaps_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.thongtindangnhaps DROP CONSTRAINT thongtindangnhaps_pkey;
       public            postgres    false    223            �           2606    16527 +   thongtindangnhaps thongtindangnhaps_sdt_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.thongtindangnhaps
    ADD CONSTRAINT thongtindangnhaps_sdt_key UNIQUE (sdt);
 U   ALTER TABLE ONLY public.thongtindangnhaps DROP CONSTRAINT thongtindangnhaps_sdt_key;
       public            postgres    false    223            �           2606    16481 "   yeucaulamviecs yeucaulamviecs_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.yeucaulamviecs
    ADD CONSTRAINT yeucaulamviecs_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.yeucaulamviecs DROP CONSTRAINT yeucaulamviecs_pkey;
       public            postgres    false    221            �           2606    16492    cuahangs fk_cuahang_chucuahang    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuahangs
    ADD CONSTRAINT fk_cuahang_chucuahang FOREIGN KEY (macch) REFERENCES public.chucuahangs(id) NOT VALID;
 H   ALTER TABLE ONLY public.cuahangs DROP CONSTRAINT fk_cuahang_chucuahang;
       public          postgres    false    215    3207    217            �           2606    16507     yeucaulamviecs fk_yeucau_cuahang    FK CONSTRAINT     �   ALTER TABLE ONLY public.yeucaulamviecs
    ADD CONSTRAINT fk_yeucau_cuahang FOREIGN KEY (macuahang) REFERENCES public.cuahangs(id) NOT VALID;
 J   ALTER TABLE ONLY public.yeucaulamviecs DROP CONSTRAINT fk_yeucau_cuahang;
       public          postgres    false    221    3201    215            �           2606    16512    yeucaulamviecs fk_yeucau_nl    FK CONSTRAINT     �   ALTER TABLE ONLY public.yeucaulamviecs
    ADD CONSTRAINT fk_yeucau_nl FOREIGN KEY (manl) REFERENCES public.nguoilams(id) NOT VALID;
 E   ALTER TABLE ONLY public.yeucaulamviecs DROP CONSTRAINT fk_yeucau_nl;
       public          postgres    false    221    219    3213            ,   l   x�32�)J�Sb�RC��R Ӕ���������А��� #?/�tH�M���K���4���M�O6�4202�50�5�@c���\FF�V�YaT ��$ˊ=... ��1^      *   y   x���!�0Fa�9E. ���!YW���k2)3M@��������#0��`���m�P��l+b����:���;��NX�gLa���1ѐ�c�@U�+�҈��q�q�����r{yN2pW~�ƘIC�      .   k   x�34�)J�Sb��\C��R Ӕ�������8KJ
2���Al��������\N###]s �4���M��1���,��\���v��a0;@l������ ��1�      2   !  x�u��o�0��3�^�R*���� ̮�5�(AJ�Ey���Mf��{����P:4�؄*Uu�̮���M~ВB(���`En�Ձ�+����*�.�0�|��)���"!�I��M����T
����?����կww�>���; G��j�v̲�M-�apl=�j�GVH�|�`�]?�n0|���F�T���q��aK���x�Qj�"�/w��M�����O?.~v�W�B�}[ϼx�H�(7>C�.�(�os*�>B��T4�\)z������2υt      0   <   x�32�44�44��I�-�LM�4202�50�5�@br�qZr�rf�V�RbNPI� 3�     