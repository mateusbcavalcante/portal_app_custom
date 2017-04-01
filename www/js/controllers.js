angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

.controller('ProfileCtrl', function($scope) {
	$scope.image = 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg';
})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
	$scope.doLogIn = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http, $templateCache, $ionicLoading, PORTAL_API_URL) {
	$templateCache.removeAll();

	$scope.feeds_categories = [];

	$ionicLoading.show({
		template: 'Carregando..'
	});

	function dataHoje() {
	    var data = new Date();
	    var dia = data.getDate();
	    var mes = data.getMonth() + 1;
	    var ano = data.getFullYear();

	    if (mes < 10) {
	    	mes = '0'+mes;
	    }

	    if (dia < 10) {
	    	dia = '0'+dia;
	    }
	    return [ano, mes, dia].join('-');
	}

	$scope.doRefresh = function() {
		$http.get(PORTAL_API_URL + 'categories').success(function(response) {
			var qtdAcademica = 0;
			var qtdBlog = 0
			var qtdColunistas = 0;
			var qtdComunicacao = 0;
			var qtdDestaque = 0;
			var qtdLivros = 0;
			var qtdMultimidia = 0;
			var qtdNoticias = 0;
			var qtdPolitica = 0;
			var qtdSaude = 0;
			var qtdTv = 0;

			angular.forEach(response, function (v) {
				if (v.slug == 'destaque') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdDestaque = qtdDestaque + 1;
							}
						});
						v.quantidade = qtdDestaque;
					});
					v.image = 'img/feeds/destaque.png';
				} else if (v.slug == 'colunistas') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {							
								qtdColunistas = qtdColunistas + 1;
							}
						});
						v.quantidade = qtdColunistas;
					});
					v.image = 'img/feeds/colunistas.jpg';	
				} else if (v.slug == 'noticias') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdNoticias = qtdNoticias + 1;
							}
						});
						v.quantidade = qtdNoticias;
					});
					v.image = 'img/feeds/news.jpg';	
				} else if (v.slug == 'academica') {
					$http.get(PORTAL_API_URL + 'posts?categories=' + v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdAcademica = qtdAcademica + 1;
							}
						});
						v.quantidade = qtdAcademica;
					});
					v.image = 'img/feeds/academica.jpg';	
				} else if (v.slug == 'blog') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdBlog = qtdBlog + 1;
							}
						});
						v.quantidade = qtdBlog;
					});
					v.image = 'img/feeds/blog.jpg';	
				
				} else if (v.slug == 'comunicacao') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdComunicacao = qtdComunicacao + 1;
							}
						});
						v.quantidade = qtdComunicacao;
					});
					v.image = 'img/feeds/comunicacao.png';	
				} else if (v.slug == 'livros') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdLivros = qtdLivros + 1;
							}
						});
						v.quantidade = qtdLivros;
					});
					v.image = 'img/feeds/livros.jpg';
				
				} else if (v.slug == 'multimidia') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdMultimidia = qtdMultimidia + 1;
							}
						});
						v.quantidade = qtdMultimidia;
					});
					v.image = 'img/feeds/multimidia.png';	
				
				} else if (v.slug == 'politica') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdPolitica = qtdPolitica + 1;
							}
						});
						v.quantidade = qtdPolitica;
					});
					v.image = 'img/feeds/politics.jpg';	
				} else if (v.slug == 'saude') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdSaude = qtdSaude + 1;
							}
						});
						v.quantidade = qtdSaude;
					});
					v.image = 'img/feeds/saude.jpg';	
				} else if (v.slug == 'tvarrudabastos') {
					$http.get(PORTAL_API_URL + 'posts?categories='+v.id).success(function(posts) {
						angular.forEach(posts, function (p) {
							if (dataHoje() == p.date.substring(0,10)) {
								qtdTv = qtdTv + 1;
							}
						});
						v.quantidade = qtdTv;
					});
					v.image = 'img/feeds/tv.png';	
				}
			});
			$scope.feeds_categories = response;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
	$scope.doRefresh();
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;
	$scope.categoryName = $stateParams.categoryName;

	$http.get('http://portalarrudabastos.com.br/wp-json/wp/v2/posts?categories='+$scope.categoryId).success(function(response) {
		$scope.feed.entries = response;
	});
})

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService, PORTAL_API_URL) {

	$scope.sourceTitle =  $stateParams.sourceId;
	$scope.categoryId = $stateParams.categoryId;	
	$scope.page = 1;
	$scope.totalPages = 1;
	$scope.feed = [];
	$scope.telaColunista = $stateParams.telaColunista;

	$scope.action = 'categories';

	if ($scope.telaColunista == 'S') {
		$scope.action = 'author';
	}

	$ionicLoading.show({
		template: 'Carregando..'
	});

	$scope.doRefresh = function() {
		$http.get(PORTAL_API_URL + 'posts?page=1&'+$scope.action+'=' + $scope.categoryId).success(function(response) {

			angular.forEach(response, function (v) {
				$http.get(PORTAL_API_URL + 'users/' +v.author).success(function(response) {
					v.nameAuthor = response.slug;
				});
				v.dateFormated = [v.date.substring(8,10), v.date.substring(5,7), v.date.substring(0,4)].join('/');
				v.content.rendered = v.content.rendered.substring(v.content.rendered.indexOf('<p>'),v.content.rendered.indexOf('<p>')+150) + " (...)";
				
				$http.get(PORTAL_API_URL + 'media/' +v.featured_media).success(function(response) {
					v.imageSrc = response.source_url;
				});
			});
			$scope.feed.entries = response;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.teste = function() {
		$scope.page = $scope.page + 1;
		
		$http.get(PORTAL_API_URL + 'posts?page='+$scope.page+'&'+$scope.action+'=' + $scope.categoryId).success(function(response) {
			angular.forEach(response, function (v) {
				$http.get(PORTAL_API_URL + 'users/' +v.author).success(function(response) {
					v.nameAuthor = response.slug;
				});
				v.dateFormated = [v.date.substring(8,10), v.date.substring(5,7), v.date.substring(0,4)].join('/');
				v.content.rendered = v.content.rendered.substring(v.content.rendered.indexOf('<p>'),v.content.rendered.indexOf('<p>')+150) + " (...)";

				$http.get(PORTAL_API_URL + 'media/' +v.featured_media).success(function(response) {
					v.imageSrc = response.source_url;
				});
			});
			var new_posts = response;
			$scope.feed.entries = $scope.feed.entries.concat(new_posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');	
		});
	}
	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Postagem salva!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};

	$scope.removerFavorito = function(index) {
		$scope.bookmarks.wordpress.splice(index, 1);
	};
})

.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	console.log('a');
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){
			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {
	$scope.post = post_data;

	$ionicLoading.hide();

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Confira esta postagem aqui: ', null, null, link);
	};
})

.controller('ContactsCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaCamera) {
	$scope.linkFacebook = 'https://facebook.com/arrudabastos';
	$scope.linkTwitter = 'https://twitter.com/arrudabastos';
	$scope.linkGooglePlus = 'https://plus.google.com/+ArrudaBastos';
	$scope.linkInstagram = 'https://www.instagram.com/arrudabastos/';
	$scope.linkYoutube = 'https://www.youtube.com/results?search_query=arruda+bastos';
})

.controller('AnuncieCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaCamera) {
	$scope.linkAnuncie = 'http://www.portalarrudabastos.com.br/contato/';
})

.controller('AreaRestritaCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaCamera) {
	$scope.linkAnuncie = 'http://www.portalarrudabastos.com.br/contato/';
})

.controller('ColunistasCtrl', function($ionicLoading, $filter, $http, $scope, $rootScope, $ionicPlatform, $cordovaCamera, PORTAL_API_URL) {

	$ionicLoading.show({
		template: 'Carregando..'
	});

	$http.get(PORTAL_API_URL + 'users').success(function(response) {
		var indicePab = 0;
		angular.forEach(response, function (v, $index) {

			if (v.slug == 'arrudabastos') {
				v.image = 'img/colunistas/perfil_arrudabastos.jpg';
			} else if (v.slug == 'joanedesson') {
				v.image = 'img/colunistas/perfil_joanedesson.jpg';
			} else if (v.slug == 'manoelfonseca') {
				v.image = 'img/colunistas/perfil_manoelfonseca.jpg';
			} else if (v.slug == 'marciobastos') {
				v.image = 'img/colunistas/perfil_marciobastos.jpg';
			} else if (v.slug == 'regisbarros') {
				v.image = 'img/colunistas/perfil_regisbarros.jpg';
			} else if (v.slug == 'liliabastos') {
				v.image = 'img/colunistas/perfil_liliabastos.jpg';
			} else if (v.slug == 'sergiocunha') {
				v.image = 'img/colunistas/perfil_sergiocunha.jpg';
			} else if (v.slug == 'luizclaudio') {
				v.image = 'img/colunistas/perfil_luizclaudio.jpg';
			} else if (v.slug == 'pab') {
				indicePab = $index;
			}
		});
		response.splice(indicePab,1);
		response = $filter('orderBy')(response, 'name');

		$scope.category_sources = response;
		$ionicLoading.hide();
	});

	
})

//bring specific category providers
.controller('CategoryFeedsCtrl2', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
})

.controller('MultimidiaCtrl', function($scope, $http, $stateParams) {
	$scope.linkSaudeEmDia = 'http://www.portalarrudabastos.com.br/2016/09/23/escutar-ao-vivo/';
	$scope.linkDimensaoTotal = 'http://tvmais.org/aovivo/';
})

.controller('ParceirosCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaCamera) {
	$scope.descricao_1 = 'É um escritório de advocacia formado por uma equipe de profissionais com experiência nas áreas relacionadas ao direito empresarial, tendo como foco o estudo das relações trabalhistas, cíveis em geral, contratuais, consumeristas e previdenciárias.';
	$scope.link_1 = 'http://www.bastosesilveira.adv.br';

	$scope.descricao_2 = 'Empresa que desenvolve sistemas, sites e aplicativos de acordo com a sua necessidade.';
	$scope.link_2 = 'http://www.a2dm.com.br';

	$scope.descricao_3 = 'Empresa de fotografia focada em ensaio, evento infantil, aniversário, chá de baby, chá de panela, eucaristia e batizado.';
	$scope.link_3 = 'http://www.wanessafacofotografia.com.br';
})

;
