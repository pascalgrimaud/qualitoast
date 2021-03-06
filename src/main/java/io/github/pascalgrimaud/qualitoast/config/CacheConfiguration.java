package io.github.pascalgrimaud.qualitoast.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Campagne.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Campagne.class.getName() + ".testeurs", jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Application.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.TypeTest.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Resultat.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Testeur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.pascalgrimaud.qualitoast.domain.Testeur.class.getName() + ".campagnes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
