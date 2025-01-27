{pkgs}: {
  deps = [
    pkgs.openssh
    pkgs.openafs
    pkgs.unixtools.ping
  ];
}
